import React, { useRef, useState } from "react";

import { getBase64 } from "./../../reusable/common";

import { AiOutlineCloseCircle } from "react-icons/ai";
import { FcUpload } from "react-icons/fc";
import styles from "./style.module.scss";
const ImageUploader = ({ images, setImages }: any) => {
  const imageRef = useRef<any>();

  const handleImageChange = async (e: any) => {
    const files = e.target.files;
    for (let file of files) {
      const dataUrl = await getBase64(file);
      setImages((prev: any) => {
        if (prev.length === 0) {
          return [...prev, { file: file, dataUrl, active: true }];
        }
        return [...prev, { file: file, dataUrl, active: false }];
      });
    }
  };
  const handleShowImage = (index: any) => {
    const updated = images.map((data: any, breakpoint: any) => {
      if (breakpoint === index) {
        return { ...data, active: true };
      }
      return { ...data, active: false };
    });
    setImages(updated);
  };
  const removeImageFromGallery = (index: any) => {
    const toBeRemove = images.filter(
      (data: any, breakpoint: any) => breakpoint !== index
    );
    const update = toBeRemove.map((data: any, breakpoint: any) => {
      if (breakpoint === 0) {
        return { ...data, active: true };
      } else {
        return { ...data, active: false };
      }
    });

    setImages(update);
  };
  return (
    <div className={styles["image-gallery-container"]}>
      <input
        onChange={handleImageChange}
        type={"file"}
        hidden={true}
        ref={imageRef}
        accept="image/*"
        multiple={true}
      />
      <div className={styles["image-gallery-view"]}>
        {Array.isArray(images) && images.length > 0 ? (
          images.map((image, index) => {
            if (image.active) {
              return <img key={index} alt="gallery view" src={image.dataUrl} />;
            }
            return null;
          })
        ) : (
          <img
            alt="block img"
            src="https://cdn1.iconfinder.com/data/icons/image-1-0/1024/image_block-512.png"
          />
        )}

        <p
          className={["mt-2", styles["upload"]].join(" ")}
          onClick={() => {
            imageRef.current.click();
          }}
        >
          <FcUpload size={20} /> <span> Upload Images</span>
        </p>
      </div>
      <div className={styles["image-gallery-lists"]}>
        {Array.isArray(images) && images.length > 0 ? (
          images.map((data, index) => {
            return (
              <div className={styles["image-gallery-list"]} key={index}>
                <img
                  onMouseEnter={() => handleShowImage(index)}
                  onClick={() => handleShowImage(index)}
                  className={`${
                    data.active
                      ? styles["image-active"]
                      : styles["image-unactive"]
                  }`}
                  alt={`gallery view ${index}`}
                  src={data.dataUrl}
                />
                <AiOutlineCloseCircle
                  onClick={() => removeImageFromGallery(index)}
                  size={25}
                  className={["text-red", styles["image-gallery-remove"]].join(
                    " "
                  )}
                />
              </div>
            );
          })
        ) : (
          <div className={styles["image-gallery-list"]}>
            <img
              className={styles["image-block"]}
              alt={`block gallery view `}
              src="https://cdn1.iconfinder.com/data/icons/image-1-0/1024/image_block-512.png"
            />
            <p className={styles["no-image-selected"]}>
              <span>No Image Selected</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
export default ImageUploader;
