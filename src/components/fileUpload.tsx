import { useEffect, useState } from "react";

import FilePreview from "./filePreview";
import { Button, Input } from "@nextui-org/react";

type PropType = {
  value?: string;
  onChange: (e: File) => void;
  readonly?: boolean;
  projectId: string;
  applicationId: string;
  userId?: string;
  isRequired: boolean;
  label: string
};

const FileUpload = (props: PropType) => {
  const { readonly, value, onChange, projectId, applicationId, userId, isRequired, label } = props;

  const [filename, setFilename] = useState<string>();

  useEffect(() => {
    if (value) {
      setFilename(value);
    }
  }, [value]);


  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (file) {
        setFilename(file.name);
        onChange(file);
      }
    }
  };


  return (
    <div>
      {readonly && filename ? (
        <FilePreview
          projectId={projectId}
          applicationId={applicationId}
          userId={userId}
          filename={filename}
        />
      ) : (
        <div className="flex flex-col">
          <label className="mb-2 text-white text-lg">{label}</label>
          <div className="flex items-center gap-4 bg-white rounded-2xl p-2">
            {/* Hidden file input */}
            <Input
              type="file"
              className="hidden" // Hide the default file input
              onChange={handleFileChange}
              accept=".jpg,.jpeg,.png,.pdf"
              isReadOnly={readonly}
              isRequired={isRequired}
              id="fileInput"
            />

            <Button as="label" htmlFor="fileInput" color="primary">
              Choose File
            </Button>

            <span className="text-gray-500">{filename || "No file chosen"}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;