"use client";
import { CldImage } from 'next-cloudinary';



// By default, the CldImage component applies auto-format and auto-quality to all delivery URLs for optimized delivery.
export default function Cloudinary(Props: {id: string}) {
  return (
    <CldImage
    width="90"
    height="60"
    src={Props.id}
    sizes="100vw"
    alt="Description of my image"
    />
  );
}