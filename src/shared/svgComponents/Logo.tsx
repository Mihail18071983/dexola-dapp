interface IProps {
  width: string;
  height: string;
  className?: string;
}

export const Logo = ({ width, height, className }: IProps) => {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width={width} height={height} fill="none">
      <g clipPath="url(#a)">
        <g clipPath="url(#b)">
          <path
            fillRule="evenodd"
            d="M3.407 19.5a3.393 3.393 0 0 1-1.729-.456 3.72 3.72 0 0 1-1.22-1.24A3.224 3.224 0 0 1 0 16.106V8.204c0-.624.153-1.19.458-1.697a3.499 3.499 0 0 1 1.22-1.215 3.255 3.255 0 0 1 1.729-.481h8.568V0H15v19.5H3.407Zm.127-3.014h7.958a.448.448 0 0 0 .33-.126.485.485 0 0 0 .153-.355V8.307a.408.408 0 0 0-.153-.33.41.41 0 0 0-.33-.152H3.534a.489.489 0 0 0-.356.152.444.444 0 0 0-.127.33v7.698c0 .135.042.253.127.355a.54.54 0 0 0 .356.126Z"
            clipRule="evenodd"
          />
        </g>
        <g clipPath="url(#c)">
          <path
            fillRule="evenodd"
            d="M34.5 17.556 28.389 12 34.5 6.444 32.361 4.5l-6.111 5.556L20.139 4.5 18 6.444 24.111 12 18 17.556l2.139 1.944 6.111-5.556 6.111 5.556 2.139-1.944Z"
            clipRule="evenodd"
          />
        </g>
      </g>
      <defs>
        <clipPath id="a">
          <path fill="#fff" d="M0 0h34.5v19.5H0z" />
        </clipPath>
        <clipPath id="b">
          <path fill="#fff" d="M0 0h15v19.5H0z" />
        </clipPath>
        <clipPath id="c">
          <path fill="#fff" d="M18 4.5h16.5v15H18z" />
        </clipPath>
      </defs>
    </svg>
  );
};
