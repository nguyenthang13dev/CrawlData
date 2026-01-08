import { UploadListType, UploadType } from 'antd/es/upload/interface';
import { TaiLieuDinhKem } from '@/types/taiLieuDinhKem/taiLieuDinhKem';
import { UploadFile, UploadProps } from 'antd/lib';
import LoaiTaiLieuConstant from '@/constants/LoaiTaiLieuConstant';

type LoaiTaiLieuType = keyof Omit<
  typeof LoaiTaiLieuConstant,
  'data' | 'getDisplayName' | 'getDropdownList'
>;

export type UseFileUploaderOptions = {
  maxCount?: number;
  initFiles?: TaiLieuDinhKem[];
  FileType: LoaiTaiLieuType;
  uploadType?: UploadType;
  listType?: UploadListType;
  itemId?: string;
  beforeUpload?: (file: File) => boolean | Promise<boolean>;
};

export type UseFileUploaderReturnType = {
  files: TaiLieuDinhKem[];
  setFiles: React.Dispatch<React.SetStateAction<TaiLieuDinhKem[]>>;
  getFiles: () => TaiLieuDinhKem[];
  getFileIds: () => string[];
  resetFiles: () => void;
  setFilesByItemId: (itemId: string) => Promise<void>;
  maxCount: number;
  uploadType?: UploadType;
  listType?: UploadListType;
  itemId?: string;
  FileType: LoaiTaiLieuType;
  previewVisible: boolean;
  previewImage: string;
  uploadFileList: UploadFile[];
  handlePreview: (file: UploadFile) => void;
  handleCheckFile: (file: UploadFile) => void;
  handleCancel: () => void;
  handleRemove: (file: UploadFile) => Promise<void>;
  customRequest: UploadProps['customRequest'];
  handleDownload: (file: UploadFile) => void;
  beforeUpload?: (file: File) => boolean | Promise<boolean>;
};
