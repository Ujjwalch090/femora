import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface LegendItem {
  name: string;
  color: string; // Tailwind background color class, e.g., 'bg-red-400'
}

interface LegendProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  items: LegendItem[];
}

const Legend = React.forwardRef<HTMLDivElement, LegendProps>(
  ({ title, items, className, ...props }, ref) => {
    return (
      <Card ref={ref} className={cn("shadow-md border-accent", className)} {...props}>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {items.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <span
                  className={cn(
                    'inline-block h-4 w-4 rounded-full border border-gray-300',
                    item.color
                  )}
                  aria-hidden="true"
                />
                <span className="text-sm text-foreground">{item.name}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }
);
Legend.displayName = 'Legend';

export { Legend };
