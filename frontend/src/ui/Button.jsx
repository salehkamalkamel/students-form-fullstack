export default function Button({
  className = "",
  onClick,
  type,
  children,
  shape,
}) {
  const styles = {
    default: "bg-blue-600 hover:bg-blue-500 text-white ",
    secBtn: "bg-gray-950 hover:bg-gray-900 text-white",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`transition-all duration-300 ease-out px-8 py-4 hover:scale-[0.99] rounded-2xl w-full font-bold outline-none border-none cursor-pointer ${
        styles[shape] || styles["default"]
      }  ${className}`}
    >
      {children}
    </button>
  );
}
