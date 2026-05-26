export default function Footer() {

  return (
    <footer className="footer sm:footer-horizontal footer-center text-base-content p-4 border-t border-base-300">
      <aside>
        <p>Copyright © {new Date().getFullYear()} - Nintendo/Creatures Inc./GAME FREAK inc./ロケット団</p>
      </aside>
    </footer>
  );
}