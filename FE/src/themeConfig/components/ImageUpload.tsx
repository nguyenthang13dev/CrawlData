import React, { useState, useEffect } from 'react';
import { Upload, Modal, message, Image } from 'antd';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload';
import { PlusOutlined } from '@ant-design/icons';

const baseURLPublic = process.env.NEXT_PUBLIC_STATIC_FILE_BASE_URL;

interface ImageUploadProps {
  valueUrl?: string; // URL hiện tại
  onChange?: (file?: RcFile) => void; // callback ra file mới
  maxSizeMB?: number;
  accept?: string; // ví dụ: "image/jpeg,image/png"
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  valueUrl,
  onChange,
  maxSizeMB = 20,
  accept = 'image/jpeg,image/png,image/gif',
}) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState<string>('');

  useEffect(() => {
    if (valueUrl) {
      setFileList([
        {
          uid: '-1',
          name: 'current-image',
          status: 'done',
          url: `${baseURLPublic}/${valueUrl}`,
        },
      ]);
    } else {
      setFileList([]);
    }
  }, [valueUrl]);

  const beforeUpload = (file: RcFile) => {
    const isValidType = accept.split(',').includes(file.type);
    if (!isValidType) {
      message.error(`Chỉ được upload file: ${accept}`);
    }
    const isLtMax = file.size / 1024 / 1024 < maxSizeMB;
    if (!isLtMax) {
      message.error(`Ảnh phải nhỏ hơn ${maxSizeMB}MB!`);
    }
    return isValidType && isLtMax;
  };

  const handleChange: UploadProps['onChange'] = ({ fileList: newList }) => {
    setFileList(newList);

    const file = newList[0]?.originFileObj as RcFile | undefined;
    if (file) {
      onChange?.(file);
    } else {
      onChange?.(null as any);
    }
  };

  const handlePreview = async (file: UploadFile) => {
    if (file.url) {
      setPreviewImage(file.url);
    } else if (file.preview) {
      setPreviewImage(file.preview as string);
    } else if (file.originFileObj) {
      const reader = new FileReader();
      reader.readAsDataURL(file.originFileObj);
      reader.onload = () => setPreviewImage(reader.result as string);
    }
    setPreviewOpen(true);
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <>
      <Upload
        accept={accept}
        listType="picture-card"
        fileList={fileList}
        beforeUpload={beforeUpload}
        onChange={handleChange}
        onPreview={handlePreview}
        maxCount={1}
      >
        {fileList.length >= 1 ? null : uploadButton}
      </Upload>

      {previewImage && (
        <Image
          wrapperStyle={{ display: 'none' }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(''),
          }}
          src={previewImage}
        />
      )}
    </>
  );
};

export default ImageUpload;
