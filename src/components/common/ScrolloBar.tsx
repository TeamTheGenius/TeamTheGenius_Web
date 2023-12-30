import { ReactNode } from "react";
import { Scrollbars } from "react-custom-scrollbars";
type scrollBarType = {
  style: React.CSSProperties;
  children: ReactNode;
};
const ScrollBar = ({ children, style }: scrollBarType) => {
  return (
    <Scrollbars
      style={style}
      renderThumbVertical={({ style, ...props }) => (
        <div
          {...props}
          style={{
            ...style,
            backgroundColor: "#7579FF",
            borderRadius: "4px",
          }}
        />
      )}
      renderThumbHorizontal={({ style, ...props }) => (
        <div
          {...props}
          style={{
            ...style,
            backgroundColor: "#7579FF",
            borderRadius: "4px",
          }}
        />
      )}
      renderView={({ style, ...props }) => (
        <div
          {...props}
          style={{
            ...style,
            paddingRight: "20px",
          }}
        />
      )}
    >
      {children}
    </Scrollbars>
  );
};

export default ScrollBar;
