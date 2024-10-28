import Container from '@/components/ui/container';
import Navbar from '@/modules/navbar';

function Header() {
  return (
    <header className="sticky top-0 bg-background w-full z-10 p-3 h-16 border-b-2 border-b-stone-900">
      <Container>
        <Navbar />
      </Container>
    </header>
  );
}
export default Header;
