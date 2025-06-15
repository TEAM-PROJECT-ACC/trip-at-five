export default function SnsButton({ Img, alt, onClick, className }) {
  return (
    <button>
      <img
        src={Img}
        alt={alt}
        onClick={onClick}
        className={className}
      />
    </button>
  );
}
