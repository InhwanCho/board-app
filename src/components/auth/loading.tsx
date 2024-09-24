/* eslint-disable @next/next/no-img-element */

export default function Loading() {
  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      <img src={"/logo.svg"} alt="logo" width={120} className="animate-pulse duration-700" />
    </div>
  )
}
