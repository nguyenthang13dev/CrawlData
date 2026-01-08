import { TaiLieuDinhKem } from "@/types/taiLieuDinhKem/taiLieuDinhKem";
import { uploadFileService } from "@/services/common/uploadFile.service";
import {
  DeleteOutlined,
  DownloadOutlined,
  EyeOutlined,
  FileDoneOutlined,
  PaperClipOutlined,
  PlusOutlined,
  UploadOutlined,
  LoadingOutlined, // Thêm icon loading
  FileOutlined,
  CloudUploadOutlined,
  FileImageOutlined,
} from "@ant-design/icons";
import {
  Button,
  Modal,
  Space,
  Tooltip,
  Upload,
  UploadFile,
  UploadProps,
  Tag,
} from "antd";
import {
  UploadListType,
  UploadType,
  RcFile,
  UploadFileStatus,
} from "antd/es/upload/interface";
import {
  forwardRef,
  useEffect,
  useState,
  useCallback,
  useMemo,
  useImperativeHandle,
} from "react";
import "./uploadFiler.css";

const DEFAULT_VALID_FILE_TYPES = [
  "image/png",
  "image/jpeg",
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // Excel (xlsx)
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // Word (docx)
  "application/msword", // Word (doc)
];

const STATIC_FILE_URL_BASE = process.env.NEXT_PUBLIC_STATIC_FILE_BASE_URL;
const MODAL_HEADER_HEIGHT = 55; // px

export interface CustomUploadFile extends UploadFile {
  isExisting?: boolean;
  isDeferredPending?: boolean; // Cờ cho biết tệp đang chờ tải lên thủ công
}

export interface UploadFilerRef {
  uploadPendingFiles: () => Promise<{
    successAll: boolean;
    results: Array<{
      fileUid: string;
      success: boolean;
      data?: TaiLieuDinhKem;
      error?: any;
    }>;
    uploadedIds: string[]; // Thêm trường để trả về danh sách ID đã upload
  }>;
}

type FileUploaderProps = {
  maxFiles?: number;
  setUploadedData: React.Dispatch<React.SetStateAction<string[]>>;
  type?: string;
  setFileList: React.Dispatch<React.SetStateAction<CustomUploadFile[]>>;
  fileList: CustomUploadFile[];
  uploadType?: UploadType;
  listType?: UploadListType;
  handleSuccess?: (taiLieus: TaiLieuDinhKem[]) => void;
  onFileRemove?: (removedFileIds: string[]) => void;
  allowedFileTypes?: string[];
  onPreview?: (file: CustomUploadFile) => void;
  deferUpload?: boolean; // Prop mới: true để trì hoãn tải lên
  width?: string;
  height?: string;
  configMaxFiles?: number; // New prop for max files from config
  configSize?: number; // New prop for size from config
  configAllowedExtensions?: string; // New prop for allowed extensions from config
  readOnly?: boolean;
};

const getBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

const constructFullUrl = (
  baseUrl: string | undefined,
  relativePath: string
): string => {
  if (
    !baseUrl ||
    /^https?:\/\//i.test(relativePath) ||
    relativePath.startsWith("//") ||
    relativePath.startsWith(baseUrl)
  ) {
    return relativePath;
  }
  const cleanedBaseUrl = baseUrl.replace(/\/$/, "");
  const cleanedRelativePath = relativePath.replace(/^\//, "");
  return `${cleanedBaseUrl}/${cleanedRelativePath}`;
};

const UploadFiler = forwardRef<UploadFilerRef, FileUploaderProps>(
  (
    {
      maxFiles = 10,
      setUploadedData,
      type,
      setFileList,
      fileList,
      uploadType = "select",
      listType = "text",
      handleSuccess,
      onFileRemove,
      allowedFileTypes = DEFAULT_VALID_FILE_TYPES,
      onPreview: onPreviewFromParent,
      deferUpload = false, // Giá trị mặc định cho prop mới
      width,
      height,
      configMaxFiles, // Thêm prop vào component
      configSize,
      configAllowedExtensions,
      readOnly = false,
    }: FileUploaderProps,
    ref
  ) => {
    const [internalPreviewVisible, setInternalPreviewVisible] = useState(false);
    const [internalPreviewFile, setInternalPreviewFile] = useState<{
      url: string;
      name: string;
      type?: string;
    }>({ url: "", name: "" });
    const [isUploadingDeferred, setIsUploadingDeferred] = useState(false);
    const [uploadedFileIds, setUploadedFileIds] = useState<string[]>([]);

    useEffect(() => {
      const filesToUpdate = fileList.filter(
        (file) =>
          file.url &&
          !file.originFileObj &&
          file.isExisting === undefined &&
          !file.url.startsWith("blob:") &&
          !file.url.startsWith("data:")
      );

      if (filesToUpdate.length > 0) {
        setFileList((currentList) =>
          currentList.map((file) => {
            if (
              file.url &&
              !file.originFileObj &&
              file.isExisting === undefined &&
              !file.url.startsWith("blob:") &&
              !file.url.startsWith("data:")
            ) {
              return {
                ...file,
                url: constructFullUrl(STATIC_FILE_URL_BASE, file.url),
                isExisting: true,
                status: file.status || "done",
              };
            }
            return file;
          })
        );
      }
    }, [fileList, setFileList]);

    const showInternalPreview = useCallback(async (file: CustomUploadFile) => {
      let fileUrl = "";
      const fileName = file.name || "file-preview";
      let fileMimeType = file.type;

      if (file.preview) {
        // Dành cho ảnh đã được AntD tạo base64 preview
        fileUrl = file.preview as string;
      } else if (file.url) {
        // Dành cho tệp đã có URL (từ server hoặc đã upload)
        fileUrl = file.url;
      } else if (file.originFileObj) {
        // Dành cho tệp mới chọn từ máy người dùng
        if (file.type?.startsWith("image/")) {
          fileUrl = await getBase64(file.originFileObj as File);
        } else {
          // Tạo URL tạm thời cho các loại tệp khác (PDF, Word, Excel) để xem trước hoặc tải xuống
          fileUrl = URL.createObjectURL(file.originFileObj);
        }
        if (!fileMimeType) fileMimeType = file.originFileObj.type;
      } else if (file.thumbUrl) {
        // Fallback của AntD
        fileUrl = file.thumbUrl;
      }

      if (!fileUrl) {
        console.error("Không thể tạo URL xem trước cho tệp này:", file.name);
        // message.error('Không thể tạo URL xem trước cho tệp này.');
        return;
      }

      setInternalPreviewFile({
        url: fileUrl,
        name: fileName,
        type: fileMimeType,
      });
      setInternalPreviewVisible(true);
    }, []); // Dependencies rỗng vì các hàm setter state là ổn định, getBase64 là hàm thuần túy

    /**
     * Xử lý khi đóng modal xem trước nội bộ.
     * Giải phóng Object URL nếu nó được tạo cho blob.
     */
    const handleInternalPreviewCancel = useCallback(() => {
      if (internalPreviewFile.url.startsWith("blob:")) {
        URL.revokeObjectURL(internalPreviewFile.url);
      }
      setInternalPreviewVisible(false);
      // Reset để tránh hiển thị nội dung cũ nếu modal mở lại nhanh
      setInternalPreviewFile({ url: "", name: "", type: undefined });
    }, [internalPreviewFile.url]);

    const renderInternalPreviewContent = () => {
      if (!internalPreviewFile.url) return null;

      const {
        url: previewUrl,
        name: previewName,
        type: previewType,
      } = internalPreviewFile;
      // Ưu tiên previewType từ state, nếu không có thì thử suy luận từ phần mở rộng của tên file
      const fileExtensionFromName = previewName.split(".").pop()?.toLowerCase();
      let effectiveMimeType = previewType;

      if (!effectiveMimeType && fileExtensionFromName) {
        if (fileExtensionFromName === "pdf")
          effectiveMimeType = "application/pdf";
        else if (
          ["jpg", "jpeg", "png", "gif", "webp"].includes(fileExtensionFromName)
        ) {
          effectiveMimeType = `image/${
            fileExtensionFromName === "jpg" ? "jpeg" : fileExtensionFromName
          }`;
        }
        // Có thể thêm các suy luận khác cho doc, docx, xls, xlsx nếu cần,
        // tuy nhiên trình duyệt thường không xem trực tiếp được các file này.
      }

      // Hiển thị PDF bằng iframe
      if (effectiveMimeType === "application/pdf") {
        return (
          <iframe
            src={`${previewUrl}#toolbar=0&navpanes=0&scrollbar=0`}
            style={{
              width: "100%",
              height: "100%",
              border: "none",
            }}
            title={previewName}
          />
        );
      }
      // Hiển thị ảnh
      else if (effectiveMimeType?.startsWith("image/")) {
        return (
          <img
            src={previewUrl}
            alt={previewName}
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
              objectFit: "contain",
              display: "block", // Giúp căn giữa nếu body modal là flex
            }}
          />
        );
      }
      // Fallback cho các loại tệp khác: hiển thị thông báo và nút tải xuống
      else {
        return (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "20px",
              textAlign: "center",
              width: "100%",
              height: "100%", // Để căn giữa trong body modal
            }}
          >
            <p className="mb-2">
              Không thể xem trước trực tiếp tệp {previewName}
            </p>
            <p className="mb-4">Vui lòng tải xuống để xem.</p>
            <Button
              type="primary"
              icon={<DownloadOutlined />}
              href={previewUrl} // URL này có thể là blob URL cho tệp mới
              download={previewName} // Trình duyệt sẽ sử dụng tên này khi tải
              target="_blank" // Mở trong tab mới an toàn hơn cho blob URL
              rel="noopener noreferrer"
            >
              Tải xuống
            </Button>
          </div>
        );
      }
    };

    const handleChange: UploadProps["onChange"] = ({
      fileList: newAntdFileList,
    }) => {
      if (readOnly) return; // chặn thay đổi ở chế độ readonly
      let updatedFileList = [...newAntdFileList] as CustomUploadFile[];
      updatedFileList = updatedFileList.slice(-maxFiles);

      updatedFileList = updatedFileList.map((file) => {
        const currentFile = { ...file } as CustomUploadFile;

        // Xử lý tệp được đánh dấu bởi customRequest trì hoãn
        if (
          currentFile.response?.deferredMarker === true &&
          currentFile.uid === currentFile.response?.uidFromFile
        ) {
          currentFile.isDeferredPending = true;
          currentFile.status = "done"; // AntD sẽ tự đặt là 'done', chúng ta chỉ xác nhận
          currentFile.response = undefined; // Xóa response giả
          currentFile.percent = 100; // Đảm bảo thanh tiến trình hoàn tất
        }

        // Xử lý tệp mới (chưa tải lên hoặc đang tải)
        if (currentFile.originFileObj && !currentFile.isExisting) {
          const isValidType =
            currentFile.type && allowedFileTypes.includes(currentFile.type);
          if (!isValidType) {
            currentFile.status = "error";
            currentFile.error = {
              message: "Loại tệp không hợp lệ.",
            };
            currentFile.isDeferredPending = false; // Không chờ nếu lỗi
          } else if (
            deferUpload &&
            !currentFile.isDeferredPending &&
            currentFile.status !== "error"
          ) {
            // Nếu deferUpload=true và tệp chưa được đánh dấu isDeferredPending (ví dụ: đang ở trạng thái 'uploading' ban đầu)
            // customRequest sẽ sớm xử lý nó. Không cần làm gì thêm ở đây.
          }
          currentFile.isExisting = false;
        }

        // Xử lý tệp đã tải lên thành công (có response từ server THỰC SỰ)
        // Điều kiện này áp dụng cho cả tải lên tức thì và tải lên trì hoãn (sau khi uploadPendingFiles chạy)
        if (
          currentFile.response &&
          currentFile.status === "done" &&
          !currentFile.response?.deferredMarker
        ) {
          const responseDataArray = currentFile.response.data;
          if (
            responseDataArray &&
            Array.isArray(responseDataArray) &&
            responseDataArray.length > 0
          ) {
            const responseFile = responseDataArray[0] as TaiLieuDinhKem;
            if (responseFile && responseFile.duongDanFile) {
              currentFile.url = constructFullUrl(
                STATIC_FILE_URL_BASE,
                responseFile.duongDanFile
              );
              if (!currentFile.name && responseFile.tenTaiLieu) {
                currentFile.name = responseFile.tenTaiLieu;
              }
            }
            if (
              responseFile &&
              responseFile.id &&
              currentFile.uid !== responseFile.id
            ) {
              currentFile.uid = responseFile.id as string;
            }
          } else if (currentFile.response.url) {
            currentFile.url = currentFile.response.url;
          }
          currentFile.isDeferredPending = false; // Đảm bảo cờ này được xóa
        }
        return currentFile;
      });
      setFileList(updatedFileList);
    };

    const handleRemove = async (file: CustomUploadFile) => {
      if (readOnly) return false; // chặn xóa ở chế độ readonly
      console.log(`UploadFiler handleRemove called for file:`, file);

      // Nếu tệp đang chờ tải lên thủ công và bị xóa, chỉ cần xóa khỏi UI
      if (file.isDeferredPending && file.originFileObj) {
        console.log(`Removing deferred pending file:`, file);
        // Không cần gọi API xóa server, không cần cập nhật setUploadedData
      } else {
        const fileIdToDelete = file.uid || file.response?.data?.[0]?.id;
        console.log(`Removing file with ID:`, fileIdToDelete);

        if (fileIdToDelete) {
          setUploadedData((prevIds) => {
            const newIds = prevIds.filter((id) => id !== fileIdToDelete);
            console.log(`Updated uploadedData after removal:`, newIds);
            return newIds;
          });

          // Gọi callback để thông báo cho parent component
          if (onFileRemove) {
            onFileRemove([fileIdToDelete]);
          }

          if (
            file.isExisting ||
            (file.status === "done" && file.response?.data?.[0]?.id)
          ) {
            try {
              await uploadFileService.deleteFilesById([
                fileIdToDelete as string,
              ]);
            } catch (err) {
              console.error("Lỗi khi xóa tệp trên máy chủ:", err);
            }
          }
        }
      }
      // Luôn cập nhật danh sách tệp hiển thị ở UI
      setFileList((prevList) =>
        prevList.filter((item) => {
          // Nếu file.uid là id từ server, so sánh trực tiếp
          // Nếu file.uid là uid tạm thời của AntD (cho file mới hoặc deferred), so sánh nó
          // Hoặc nếu là file mới hoàn toàn, so sánh originFileObj
          if (item.uid === file.uid) return false;
          if (
            item.originFileObj &&
            file.originFileObj &&
            item.originFileObj === file.originFileObj
          )
            return false;
          return true;
        })
      );
    };

    const customRequest: UploadProps["customRequest"] = async ({
      file,
      onSuccess,
      onError,
    }) => {
      if (readOnly) return; // chặn upload ở chế độ readonly
      const rcFile = file as RcFile;
      if (deferUpload) {
        // Đánh dấu tệp này là trì hoãn và gọi onSuccess để AntD không hiển thị lỗi/loading vô hạn
        // Truyền uid của tệp để handleChange có thể xác định chính xác tệp này
        onSuccess?.({ deferredMarker: true, uidFromFile: rcFile.uid }, rcFile);
        return;
      }

      // Logic tải lên tức thì (giữ nguyên)
      const formData = new FormData();
      formData.append("Files", file as Blob);
      if (type) {
        formData.append("FileType", type);
      }
      try {
        const result = await uploadFileService.upload(formData);
        if (result.status && result.data && result.data.length > 0) {
          setUploadedData((prevIds) => {
            const newFileIds = result.data.map(
              (f: TaiLieuDinhKem) => f.id as string
            );
            const uniqueNewIds = newFileIds.filter(
              (id) => !prevIds.includes(id)
            );
            return [...prevIds, ...uniqueNewIds];
          });

          console.log(`UploadFiler customRequest success - result:`, result);
          onSuccess?.(result);
          if (handleSuccess) {
            console.log(`UploadFiler calling handleSuccess with:`, result.data);
            handleSuccess(result.data);
          }
        } else {
          onError?.(
            new Error(result.message || "Tải lên thất bại, không có dữ liệu."),
            result
          );
        }
      } catch (error: any) {
        onError?.(error);
      }
    };

    const uploadProps: UploadProps<CustomUploadFile> = useMemo(
      () => ({
        listType: listType,
        fileList: fileList,
        customRequest: customRequest,
        onPreview: onPreviewFromParent || showInternalPreview,
        onChange: handleChange,
        multiple: !readOnly,
        onRemove: handleRemove,
        showUploadList: {
          showPreviewIcon: true,
          showRemoveIcon: !readOnly,
          showDownloadIcon: true,
        },
        disabled: readOnly,
        itemRender: (
          originNode: React.ReactNode,
          file: CustomUploadFile,
          currentFileList: CustomUploadFile[],
          actions: {
            download: () => void;
            preview: () => void;
            remove: () => void;
          }
        ) => {
          const isError = file.status === "error";
          const isExistingFile = file.isExisting === true;
          const isUploading = file.status === "uploading";
          // File đang chờ tải lên thủ công (deferUpload=true)
          const isPendingManualUpload =
            file.isDeferredPending === true && !isError && !isUploading;
          // File vừa được tải lên thành công (không phải file cũ, không phải đang chờ, không phải đang tải)
          const isNewlyUploadedDone =
            !isExistingFile &&
            file.status === "done" &&
            !isUploading &&
            !isPendingManualUpload;

          const canPreview =
            (file.url || file.originFileObj || file.preview || file.thumbUrl) &&
            !isError;
          const canDownload =
            (isExistingFile || isNewlyUploadedDone) &&
            file.url &&
            !isError &&
            !isPendingManualUpload;

          return (
            <div
              className={`custom-upload-list-item ${
                isError ? "item-error" : ""
              } ${isPendingManualUpload ? "item-pending-manual" : ""}`}
              style={{
                display: "flex",
                flexDirection: "column",
                padding: "5px 0",
                gap: "4px",
              }}
            >
              <div
                className="custom-upload-list-item-row"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  width: "100%",
                }}
              >
                <Space className="file-status-icons">
                  {isExistingFile && !isError && (
                    <Tooltip title="Tệp đã có">
                      <FileDoneOutlined style={{ color: "green" }} />
                    </Tooltip>
                  )}
                  {isNewlyUploadedDone && !isError && (
                    <Tooltip title="Vừa tải lên">
                      <UploadOutlined style={{ color: "blue" }} />
                    </Tooltip>
                  )}
                  {isPendingManualUpload && (
                    <Tooltip title="Chờ tải lên">
                      <PaperClipOutlined style={{ color: "orange" }} />
                    </Tooltip>
                  )}
                  {isUploading && (
                    <Tooltip
                      title={
                        isUploadingDeferred ? "Đang xử lý..." : "Đang tải..."
                      }
                    >
                      <LoadingOutlined spin />
                    </Tooltip>
                  )}
                  {isError && (
                    <Tooltip title={(file.error?.message as string) || "Lỗi"}>
                      <PaperClipOutlined style={{ color: "red" }} />
                    </Tooltip>
                  )}
                </Space>

                {/* Tên tệp (có thể click để xem trước) */}
                <span
                  className="custom-file-name"
                  title={file.name}
                  style={{
                    flexGrow: 1,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    padding: "0 4px",
                    color: canPreview ? "#1890ff" : "inherit", // Màu link nếu có thể xem trước
                    cursor: canPreview ? "pointer" : "default",
                  }}
                  onClick={(e) => {
                    if (canPreview) {
                      e.preventDefault();
                      actions.preview(); // Gọi hàm onPreview đã được cung cấp cho Upload
                    }
                  }}
                >
                  {file.name}
                </span>

                {/* Các nút hành động: Xem trước, Tải xuống, Xóa */}
                <Space
                  className="file-action-buttons"
                  style={{ marginLeft: "auto" }}
                >
                  {canPreview && (
                    <Tooltip title="Xem trước">
                      <Button
                        type="text"
                        icon={<EyeOutlined />}
                        size="small"
                        onClick={() => actions.preview()}
                      />
                    </Tooltip>
                  )}
                  {canDownload && (
                    <Tooltip title="Tải xuống">
                      <Button
                        type="text"
                        icon={<DownloadOutlined />}
                        size="small"
                        onClick={() => {
                          if (!file.url) return;
                          // Tạo link ảo để kích hoạt tải xuống
                          const link = document.createElement("a");
                          link.href = file.url;
                          link.download = file.name || "downloaded-file";
                          link.target = "_blank"; // An toàn hơn cho blob URL
                          link.rel = "noopener noreferrer";
                          document.body.appendChild(link);
                          link.click();
                          document.body.removeChild(link);
                        }}
                      />
                    </Tooltip>
                  )}
                  <Tooltip title="Gỡ bỏ">
                    <Button
                      type="text"
                      danger
                      icon={<DeleteOutlined />}
                      size="small"
                      onClick={() => actions.remove()}
                    />
                  </Tooltip>
                </Space>
              </div>
              {isError && (
                <span
                  className="custom-upload-error-text"
                  style={{
                    color: "red",
                    fontSize: "12px",
                    paddingLeft: "32px",
                  }}
                >
                  {(file.error?.message as string) ||
                    (file.response?.message as string) ||
                    "Tệp không hợp lệ"}
                </span>
              )}
            </div>
          );
        },
      }),
      [
        listType,
        fileList,
        onPreviewFromParent,
        showInternalPreview,
        handleChange,
        handleRemove,
        customRequest,
        deferUpload,
        isUploadingDeferred,
        readOnly,
      ]
    );

    const uploadButtonContent = useMemo(() => {
      if (listType === "text" || listType === "picture") {
        return (
          <div
            className="pretty-upload-trigger"
            role={readOnly ? undefined : "button"}
            tabIndex={readOnly ? -1 : 0}
            style={{
              width: width,
              height: height,
              opacity: readOnly ? 0.6 : 1,
              cursor: readOnly ? "default" : "pointer",
            }}
            onKeyDown={
              readOnly
                ? undefined
                : (e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      // AntD sẽ bắt click ở container; mô phỏng click để mở file dialog
                      (e.currentTarget as HTMLElement).click();
                    }
                  }
            }
          >
            <div className="pretty-upload-trigger__inner">
              <span className="pretty-upload-trigger__icon">
                <UploadOutlined />
              </span>
              <div className="pretty-upload-trigger__texts">
                <Space
                  size={[0, 8]}
                  wrap
                  style={{ justifyContent: "center", width: "100%" }}
                >
                  {configMaxFiles && (
                    <Tag
                      icon={<FileOutlined />}
                      color="blue"
                      style={{ fontSize: "12px", padding: "4px 8px" }}
                    >
                      Số lượng: {configMaxFiles}
                    </Tag>
                  )}
                  {configSize && (
                    <Tag
                      icon={<CloudUploadOutlined />}
                      color="green"
                      style={{ fontSize: "12px", padding: "4px 8px" }}
                    >
                      {configSize} MB
                    </Tag>
                  )}
                  {configAllowedExtensions && (
                    <Tooltip
                      title={`Định dạng: ${configAllowedExtensions
                        .split(",")
                        .map((ext) => `.${ext.trim().toLowerCase()}`)
                        .join(", ")}`}
                    >
                      <Tag
                        icon={<FileImageOutlined />}
                        color="orange"
                        style={{ fontSize: "12px", padding: "4px 8px" }}
                      />
                    </Tooltip>
                  )}
                </Space>
              </div>
            </div>
          </div>
        );
      }
      // Mặc định cho listType="picture-card"
      return (
        <div>
          <PlusOutlined />
          <div className="ant-upload-text">Tải lên</div>
        </div>
      );
    }, [
      listType,
      fileList.length,
      maxFiles,
      width,
      height,
      configMaxFiles,
      configSize,
      configAllowedExtensions,
      readOnly,
    ]);

    useImperativeHandle(ref, () => ({
      uploadPendingFiles: async () => {
        setIsUploadingDeferred(true);
        const results: Array<{
          fileUid: string;
          success: boolean;
          data?: TaiLieuDinhKem;
          error?: any;
        }> = [];
        let successAll = true;

        const pendingFiles = fileList.filter(
          (f) =>
            f.isDeferredPending &&
            f.originFileObj &&
            f.status !== "error" &&
            f.status !== "uploading"
        );

        const allUploadedIds: string[] = [];
        fileList.forEach((file) => {
          if (
            (file.isExisting ||
              (file.status === "done" && !file.isDeferredPending)) &&
            file.uid
          ) {
            if (!allUploadedIds.includes(file.uid)) {
              allUploadedIds.push(file.uid);
            }
          }
        });

        if (pendingFiles.length === 0) {
          setIsUploadingDeferred(false);
          setUploadedFileIds(allUploadedIds);
          return {
            successAll: true,
            results: [],
            uploadedIds: allUploadedIds,
          };
        }

        try {
          pendingFiles.forEach((fileToUpload) => {
            setFileList((currentList) =>
              currentList.map((f) =>
                f.uid === fileToUpload.uid
                  ? {
                      ...f,
                      status: "uploading" as UploadFileStatus,
                      percent: 10,
                    }
                  : f
              )
            );
          });

          // --- THAY ĐỔI CÁCH TẠO FORMDATA ---
          const formData = new FormData();

          pendingFiles.forEach((fileToUpload, index) => {
            const rcFile = fileToUpload.originFileObj as RcFile;

            // Mỗi file sẽ tương ứng với một UploadFileDto trong danh sách 'forms'
            // forms[index].FileType
            if (type) {
              // 'type' là prop chung từ UploadFiler
              formData.append(`forms[${index}].FileType`, type);
            }
            // forms[index].MoTa
            // Bạn có thể tùy chỉnh MoTa cho từng file nếu cần
            formData.append(`forms[${index}].MoTa`, `Tệp: ${rcFile.name}`);
            // forms[index].IsTemp
            formData.append(`forms[${index}].IsTemp`, "false");
            // forms[index].Files (sẽ chỉ chứa một file này)
            formData.append(`forms[${index}].Files`, rcFile, rcFile.name);
            // Nếu bạn có IdBieuMau cho từng file, bạn cũng có thể thêm ở đây:
            // formData.append(`forms[${index}].IdBieuMau`, "guid-bieu-mau-cho-file-nay");
          });
          // --- KẾT THÚC THAY ĐỔI FORMDATA ---

          const result = await uploadFileService.uploadMultiFile(formData);
          if (result.status && result.data && result.data.length > 0) {
            const taiLieuDinhKemArray = result.data as TaiLieuDinhKem[];
            const newFileIds = taiLieuDinhKemArray.map(
              (f: TaiLieuDinhKem) => f.id as string
            );

            // Map kết quả trở lại file tương ứng.
            // Giả định rằng backend trả về danh sách TaiLieuDinhKem theo đúng thứ tự
            // các UploadFileDto đã được gửi.
            const fileResults = taiLieuDinhKemArray.map((taiLieuDto, i) => {
              // pendingFiles[i] là file gốc tương ứng với taiLieuDto này
              return {
                data: taiLieuDto,
                fileUid: pendingFiles[i]?.uid || `unknown-uid-${i}`, // Lấy uid của file gốc
              };
            });

            fileResults.forEach((fileResult) => {
              const originalFileUid = fileResult.fileUid;
              setFileList((currentList) =>
                currentList.map((f) => {
                  if (f.uid === originalFileUid) {
                    return {
                      ...f,
                      status: "done" as UploadFileStatus,
                      percent: 100,
                      response: {
                        data: [fileResult.data],
                      }, // Gói lại để giống cấu trúc response mong đợi
                      isDeferredPending: false,
                      uid: fileResult.data.id as string, // Cập nhật uid với id thật từ server
                      url: constructFullUrl(
                        STATIC_FILE_URL_BASE,
                        fileResult.data.duongDanFile
                      ),
                      name: f.name || fileResult.data.tenTaiLieu,
                    };
                  }
                  return f;
                })
              );
              results.push({
                fileUid: originalFileUid,
                success: true,
                data: fileResult.data,
              });
            });

            if (setUploadedData) {
              setUploadedData((prevIds: string[]) => {
                const uniqueNewIds = newFileIds.filter(
                  (id) => !prevIds.includes(id)
                );
                return [...prevIds, ...uniqueNewIds];
              });
            }

            if (handleSuccess) {
              handleSuccess(taiLieuDinhKemArray);
            }

            const finalUploadedIds = [...allUploadedIds];
            newFileIds.forEach((id) => {
              if (!finalUploadedIds.includes(id)) {
                finalUploadedIds.push(id);
              }
            });

            setUploadedFileIds(finalUploadedIds);
            setIsUploadingDeferred(false);

            return {
              successAll: true,
              results,
              uploadedIds: finalUploadedIds,
            };
          } else {
            successAll = false;
            pendingFiles.forEach((fileToUpload) => {
              setFileList((currentList) =>
                currentList.map((f) =>
                  f.uid === fileToUpload.uid
                    ? {
                        ...f,
                        status: "error" as UploadFileStatus,
                        error: {
                          message: result.message || "Tải lên thất bại",
                        },
                        isDeferredPending: false,
                      }
                    : f
                )
              );
              results.push({
                fileUid: fileToUpload.uid,
                success: false,
                error: new Error(result.message || "Tải lên thất bại"),
              });
            });
          }
        } catch (error: any) {
          successAll = false;
          pendingFiles.forEach((fileToUpload) => {
            setFileList((currentList) =>
              currentList.map((f) =>
                f.uid === fileToUpload.uid
                  ? {
                      ...f,
                      status: "error" as UploadFileStatus,
                      error: {
                        message: error.message || "Lỗi hệ thống khi tải lên",
                      },
                      isDeferredPending: false,
                    }
                  : f
              )
            );
            results.push({
              fileUid: fileToUpload.uid,
              success: false,
              error,
            });
          });
        }

        setIsUploadingDeferred(false);
        return {
          successAll,
          results,
          uploadedIds: allUploadedIds, // Trả về ID cũ nếu có lỗi xảy ra với các file mới
        };
      },
    }));

    return (
      <>
        <div className="upload-filer">
          {/* Component Upload của AntD: kiểu kéo thả hoặc chọn tệp */}
          {uploadType === "drag" ? (
            <Upload.Dragger
              {...uploadProps}
              name="files"
              className="upload-filer__control"
              disabled={readOnly || fileList.length >= maxFiles}
            >
              <p className="ant-upload-drag-icon">
                <UploadOutlined />
              </p>
              <p className="ant-upload-text">
                Nhấn hoặc kéo thả tệp vào đây để tải lên
              </p>
              <p className="ant-upload-hint">
                Hỗ trợ tải lên nhiều tệp.
                {configMaxFiles && ` Tối đa: ${configMaxFiles} tệp.`}
                {configSize && ` Kích thước: ${configSize} MB.`}
                {configAllowedExtensions &&
                  ` Định dạng: ${configAllowedExtensions
                    .split(",")
                    .map((ext) => `.${ext.trim().toLowerCase()}`)
                    .join(", ")}.`}
              </p>
            </Upload.Dragger>
          ) : (
            <Upload
              {...uploadProps}
              className="upload-filer__control"
              disabled={readOnly}
            >
              {fileList.length >= maxFiles ? null : uploadButtonContent}
            </Upload>
          )}
        </div>

        {/* Modal xem trước tệp nội bộ */}
        <Modal
          open={internalPreviewVisible}
          title={internalPreviewFile.name}
          footer={null} // Không cần footer mặc định
          onCancel={handleInternalPreviewCancel}
          width="80vw" // Chiều rộng modal là 80% viewport width
          centered // Căn giữa modal theo chiều dọc
          style={{
            maxWidth: "1000px", // Giới hạn chiều rộng tối đa
            minWidth: "400px", // Giới hạn chiều rộng tối thiểu
          }}
          bodyStyle={{
            // Chiều cao tối đa cho vùng nội dung (85% viewport height - chiều cao header modal)
            maxHeight: `calc(85vh - ${MODAL_HEADER_HEIGHT}px)`,
            minHeight: "300px", // Chiều cao tối thiểu
            overflowY: "auto", // Cho phép cuộn dọc nếu nội dung vượt quá maxHeight
            overflowX: "hidden", // Thường không muốn cuộn ngang ở body
            padding: "0", // Bỏ padding mặc định để nội dung con (iframe, img) tự quản lý
            display: "flex", // Sử dụng flex để căn giữa nội dung con
            alignItems: "center",
            justifyContent: "center",
          }}
          destroyOnClose
        >
          {renderInternalPreviewContent()}
        </Modal>
      </>
    );
  }
);

UploadFiler.displayName = "UploadFiler";
export default UploadFiler;
