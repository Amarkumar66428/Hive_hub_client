import { useRef } from "react";

const EditableText = ({ className, textKey, value, onChange }) => {
  const ref = useRef(null);

  const handleClick = () => {
    const el = ref.current;
    el.setAttribute("contenteditable", "true");
    el.focus();

    // Move cursor to end
    const range = document.createRange();
    const sel = window.getSelection();
    range.selectNodeContents(el);
    range.collapse(false);
    sel.removeAllRanges();
    sel.addRange(range);
  };

  const handleBlur = () => {
    const el = ref.current;
    el.removeAttribute("contenteditable");
    onChange(textKey, el.innerText);
  };

  return (
    <div
      className={className}
      ref={ref}
      onClick={handleClick}
      onBlur={handleBlur}
      style={{
        border: "1px solid rgb(101, 182, 248)",
        cursor: "pointer",
        whiteSpace: "pre-wrap",
        direction: "ltr",
      }}
      onMouseOver={(e) =>
        (e.currentTarget.style.borderColor = "rgb(101, 182, 248)")
      }
      onMouseOut={(e) => (e.currentTarget.style.borderColor = "transparent")}
    >
      {value}
    </div>
  );
};

export default EditableText;
