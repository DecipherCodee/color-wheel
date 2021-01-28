import { useStore } from "./utils";

export function useGameOverLogo() {
  const { gameOverLogo } = useStore();

  return (
    <main className={gameOverLogo}>
      <svg
        viewBox="0 0 602 64"
        width="602"
        fillRule="evenodd"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="m589 13h13v13h-13z" fill="#8ac33b" />
        <path d="m576 64h-12v-51h12v13h13v13h-13z" fill="#ffce2e" />
        <path d="m498 26h12v25h-12z" fill="#fb6e56" />
        <path d="m510 13h26v13h-26z" fill="#e12519" />
        <path d="m523 39h13v12h13v13h-39v-13h13z" fill="#c8d75c" />
        <path d="m536 26h13v12h-13z" fill="#59b8dd" />
        <path d="m430 13h13v38h-13z" fill="#8ac33b" />
        <path d="m468 13h13v38h-13z" fill="#ffcf2d" />
        <path d="m443 51h25v13h-25z" fill="#e22519" />
        <path d="m351 13h12v38h-12z" fill="#f8b912" />
        <path d="m402 13h12v38h-12z" fill="#59b8dd" />
        <path d="m363 51h39v13h-39z" fill="#c8d75c" />
        <path d="m363 0h39v13h-39z" fill="#e12519" />
        <path d="m251 26h12v25h-12z" fill="#ffce2e" />
        <path d="m263 13h26v13h-26z" fill="#c8d75c" />
        <path d="m276 39h13v12h13v13h-39v-13h13z" fill="#8ac33b" />
        <path
          d="m289 26h13v12h-13zm-132 38h-12v-51h38v13h-26z"
          fill="#e12519"
        />
        <path d="m183 26h13v38h-13z" fill="#ffce2e" />
        <path d="m221 26h13v38h-13z" fill="#fb6e56" />
        <path d="m196 13h25v13h-25z" fill="#c8d75c" />
        <path d="m77 26h13v25h-13z" fill="#59b8dd" />
        <path d="m128 13v51h-38v-13h25v-25h-25v-13z" fill="#c8d85a" />
        <path d="m13 0h38v13h-38z" fill="#e02519" />
        <path d="m13 51h38v13h-38z" fill="#fb6e56" />
        <path d="m0 13h13v38h-13z" fill="#c8d75c" />
        <path d="m64 51h-13v-12h-25v-13h38z" fill="#ffce2c" />
      </svg>
    </main>
  );
}
