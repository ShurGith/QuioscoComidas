"use client"

import { getImagePath } from "@/src/lib/utils";
import { Icon } from "@iconify/react";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useState } from "react";
import { toast } from "react-toastify";

export default function ImageUpload({ image }: { image: string | null | undefined }) {
  const [imageUrl, setImageUrl] = useState('')
  const url = window.location.href;

  const matchNew = url.includes("/new");


  return (
    <CldUploadWidget
      uploadPreset="QuioscoCocina"
      options={{
        maxFiles: 1,
      }}
      onSuccess={(result, { widget }) => {
        toast.success("Imagen subida correctamente!");
        if (result.event === 'success') {
          // @ts-expect-error: property 'secure_url' does exist on 'info' property
          setImageUrl(result.info?.secure_url);
          widget.close();
        }
      }}
    >
      {({ open }) => (
        <>
          <div className="space-y-2">
            <label className="text-slate-700">Imagen del Producto</label>
            <div
              onClick={() => open()}
              className="relative h-60 cursor-pointer hover:opacity-70 transition duration-300 flex flex-col rounded-md p-5 justify-center items-center gap-4 text-neutral-600 bg-slate-100"
            >
              <Icon icon="sidekickicons:photo-plus" width="50" height="50" />
              {!imageUrl &&
                <p className="text-lg font-bold">{matchNew ? 'Subir imagen' : 'Cambiar imagen'}</p>
              }
              {imageUrl && (
                <div className="absolute inset-0 w-full h-full">
                  <Image
                    fill
                    style={{ objectFit: 'contain' }}
                    src={imageUrl}
                    alt="Imagen de producto" />
                </div>
              )}
            </div>
          </div>
          {image && !imageUrl && (
            <div className="space-y-2 flex flex-col items-center justify-center">
              <label>Imagen Actual:</label>
              <div className="aspect-square overflow-hidden rounded-xl border border-gray-300 w-64 h-64 ">
                <Image
                  width={256}
                  height={256}
                  src={getImagePath(image)}
                  alt="Imagen actual del producto" />
              </div>
            </div>
          )}

          <input
            type='hidden'
            name='image'
            defaultValue={imageUrl || image || ''} />
        </>
      )}
    </CldUploadWidget>
  )
}