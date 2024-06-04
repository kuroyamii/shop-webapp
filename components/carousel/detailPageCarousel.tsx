import Slider from "react-slick";
import { useState, useEffect, LegacyRef } from "react";
import { useRef } from "react";
import { AxiosError } from "axios";
import { ProductAPI } from "@/service/api-fetch";

const DetailPageCarousel = ({ productImages }: { productImages: string[] }) => {
  const [firstSlider, setFirstSlider] = useState(null);
  const [secondSlider, setSecondSlider] = useState(null);
  // Using <any> type because unknown ref type
  const firstSliderRef = useRef<any>(null);
  const secondSliderRef = useRef<any>(null);
  const [imageSourceUrls, setImageSourceUrls] = useState<string[]>();
  async function getImageBlob(index: number) {
    const res: Blob | AxiosError | unknown = await ProductAPI.getImage(
      productImages[index]
        .replaceAll("[", "")
        .replaceAll("]", "")
        .replaceAll(`"`, "")
    ).then((response) => {
      if (response instanceof Blob) {
        const reader = new FileReader();
        reader.readAsDataURL(response);
        reader.onloadend = function () {
          const base64Data = reader.result;
          if (typeof base64Data == "string") {
            if (imageSourceUrls == undefined) {
              setImageSourceUrls([base64Data]);
            } else {
              let imageSource = imageSourceUrls;
              imageSource?.push(base64Data);
              setImageSourceUrls(imageSource);
            }
          }
        };
      }
    });
  }

  useEffect(() => {
    for (let item in productImages) {
      getImageBlob(parseInt(item));
    }
  }, [productImages]);
  return (
    <>
      <div>
        <Slider ref={firstSliderRef} arrows={false}>
          {productImages?.map((image, idx) => (
            <div key={idx}>
              <img
                src={image}
                alt=""
                className="h-[269px] md:h-[292px] mx-auto pr-1 w-full object-cover rounded-lg overflow-hidden"
              />
            </div>
          ))}
        </Slider>

        {productImages?.length > 0 && productImages?.length >= 3 ? (
          <Slider
            slidesToShow={3}
            swipeToSlide={true}
            focusOnSelect={true}
            className="pt-5"
            arrows={false}
          >
            {productImages?.map((image, idx) => (
              <div
                className="pr-1"
                onClick={() => {
                  firstSliderRef?.current?.slickGoTo(idx);
                }}
                key={idx}
              >
                <img
                  src={image}
                  alt=""
                  className="h-[56px] w-full md:h-[103px] object-cover mx-auto"
                />
              </div>
            ))}
          </Slider>
        ) : (
          <div className="flex flex-row w-full justify-center">
            {productImages?.map((image, idx) => (
              <div
                className="pr-1 w-full h-full object-cover"
                onClick={() => {
                  firstSliderRef?.current?.slickGoTo(idx);
                }}
                key={idx}
              >
                <img
                  src={image}
                  alt=""
                  className="h-[56px] md:h-[103px] object-fit"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default DetailPageCarousel;
