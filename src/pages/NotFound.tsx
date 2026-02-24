import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import usePageTitle from '@/hooks/usePageTitle';

const NotFound = () => {
  usePageTitle('Page Not Found');
  return (
    <main className="container mx-auto flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-primary/10 text-4xl font-black text-primary">
        404
      </div>
      <h1 className="mt-6 text-3xl font-bold">Page Not Found</h1>
      <p className="mt-3 max-w-md text-muted-foreground">
        This card must have sold out! The page you're looking for doesn't exist.
      </p>
      <div className="mt-8 flex flex-wrap gap-3 justify-center">
        <Button asChild size="lg">
          <Link to="/shop">Browse Cards</Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link to="/">Go Home</Link>
        </Button>
      </div>
    </main>
  );
};

export default NotFound;
