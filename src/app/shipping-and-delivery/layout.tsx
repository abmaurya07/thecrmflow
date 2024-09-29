import { LayoutProps } from '@/lib/types/types';
import Footer from '@/components/Footer';
import Header from '@/components/Header';

export default async function MarketingLayout({ children }: LayoutProps) {
  return (
    <div>
      <Header />
      <main className="grid items-center justify-center">{children}</main>
      <Footer />
    </div>
  );
}
