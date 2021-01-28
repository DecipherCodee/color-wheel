import { useStore } from "./utils";

export function usePauseName() {
  const { pauseName } = useStore();

  return (
    <main className={pauseName}>
      <svg viewBox="0 0 123 24" xmlns="http://www.w3.org/2000/svg">
        <g fill="none" fillRule="evenodd">
          <g transform="translate(104 5)">
            <path d="m0 4.843137h4.470588v9.313725h-4.470588z" fill="#fb6e56" />
            <path d="m4.470588 0h9.686275v4.843137h-9.686275z" fill="#e12519" />
            <path
              d="m9.31372549 9.68627451h4.84313721v4.47058819h4.8431373v4.8431373h-14.52941176v-4.8431373h4.84313725z"
              fill="#c8d75c"
            />
            <path
              d="m14.156863 4.843137h4.843137v4.470588h-4.843137z"
              fill="#59b8dd"
            />
          </g>
          <g transform="translate(79 5)">
            <path
              d="m4.84313725 4.84313725v-4.84313725h14.15686275v4.84313725h-9.68627451v4.47058824h-9.31372549v-4.47058824z"
              fill="#8ac33b"
            />
            <path
              d="m9.68627451 14.1568627v-4.84313721h9.31372549v4.84313721h-4.8431373v4.8431373h-14.1568627v-4.8431373z"
              fill="#59b8dd"
            />
          </g>
          <g transform="translate(54 5)">
            <path
              d="m14.1568627 14.1568627v-14.1568627h4.8431373v19h-14.52941176v-4.8431373z"
              fill="#fb6e56"
            />
            <path d="m0 0h4.470588v14.156863h-4.470588z" fill="#ffce2e" />
          </g>
          <g transform="translate(29 5)">
            <path d="m0 4.843137h4.843137v9.313725h-4.843137z" fill="#59b8dd" />
            <path
              d="m19 0v19h-14.15686275v-4.8431373h9.31372545v-9.31372545h-9.31372545v-4.84313725z"
              fill="#c8d85a"
            />
          </g>
          <path
            d="m4.875 14.25h14.25v4.875h-14.25v4.875h-4.875v-24h19.125v4.875h-14.25z"
            fill="#ffce2e"
          />
          <path d="m19.125 4.875h4.875v9.375h-4.875z" fill="#e02519" />
        </g>
      </svg>
    </main>
  );
}
