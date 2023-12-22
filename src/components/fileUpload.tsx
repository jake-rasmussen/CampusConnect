import { useEffect, useState } from "react";

import { api } from "~/utils/api";
import FilePreview from "./filePreview";

type PropType = {
  value?: string;
  onChange: (e: File) => void;
  readonly?: boolean;
  projectId: string;
  applicationId: string;
};

const FileUpload = (props: PropType) => {
  const { readonly, value, onChange, projectId, applicationId } = props;

  const [filename, setFilename] = useState<string>();

  useEffect(() => {
    if (value) {
      setFilename(value);
    }
  }, [value]);

  return (
    <div className="relative">
      {readonly && filename ? (
        <>
          <FilePreview
            projectId={projectId}
            applicationId={applicationId}
            filename={filename}
          />
        </>
      ) : (
        <>
          <input
            className="absolute inset-0 h-full w-full cursor-pointer rounded-lg rounded-xl border bg-white p-3 opacity-0"
            type="file"
            onChange={(e) => {
              const files = e.currentTarget.files;
              if (files && files.length > 0) {
                const file = files[0];
                if (file) {
                  setFilename(file.name);
                  onChange(file);
                }
              }
            }}
            accept=".jpg,.jpeg,.png"
            disabled={readonly}
          />
          <label className="mr-8 block w-full cursor-pointer rounded-lg rounded-xl border bg-white p-3">
            <span className="mr-2 rounded-full border-none bg-secondary px-4 py-2 font-black uppercase text-white shadow-xl">
              Select File
            </span>
            {filename ? filename : "No file chosen..."}
          </label>
        </>
      )}
    </div>
  );
};

export default FileUpload;
