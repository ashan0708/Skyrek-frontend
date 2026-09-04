export default function LoadingScreen() {
  return (
    <div className="absolute inset-0 bg-black/40 flex justify-center items-center z-40">
      <div className="w-[70px] h-[70px] border-4 border-white border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}