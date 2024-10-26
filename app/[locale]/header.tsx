import Container from '@/components/ui/container';
import Navbar from '@/modules/navbar';

function Header() {
  return (
    <header className="fixed top-0 bg-background w-full left-0 z-10 p-3 border-b-2 border-b-stone-900">
      <Container>
        <Navbar />
      </Container>
    </header>
  );
}
export default Header;
