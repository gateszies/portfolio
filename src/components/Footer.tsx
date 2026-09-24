const footerClasses =
  "fontFamily-heading fontSize-heading-sm lineHeight-heading-sm letterSpacing-heading fgColor-primary";

export function Footer() {
  return (
    <p className={footerClasses}>
      designed in figma, built with next.js + tailwind, deployed on vercel
    </p>
  );
}
