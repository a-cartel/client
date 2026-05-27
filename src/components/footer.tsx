export default function Footer() {

  return (
    <footer className="footer sm:footer-horizontal footer-center text-base-content p-4 border-t border-base-300">
      <aside>
        <p>Copyright © {new Date().getFullYear()} - Nintendo/Creatures Inc./GAME FREAK inc./ロケット団</p>
        <p>ポケットモンスター・ポケモン・Pokémonは任天堂・クリーチャーズ・ゲームフリークの商標です。</p>
      </aside>
    </footer>
  );
}