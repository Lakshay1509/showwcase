import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import DeleteHero from "./DeleteHero";


interface HeroCard {
  title: string;
  description: string;
  url: string;
  favicon?: string | null;
  id:string
  render : boolean
}

const HeroCard = ({ title, description, url, favicon ,id,render}: HeroCard) => {

    

  return (
    <Card className="w-[300px] transition-all duration-300 hover:shadow-lg hover:scale-105 bg-white dark:bg-slate-800 border-none">
      <CardHeader className="space-y-2">
        <div className="flex items-center gap-2">
          {favicon && (
            <img
              src={favicon}
              alt={`${title} favicon`}
              className="w-6 h-6 rounded-full"
            />
          )}
          <CardTitle className="text-xl font-bold text-slate-800 dark:text-slate-100">
            {title}
          </CardTitle>
        </div>
        <CardDescription className="text-sm text-slate-600 dark:text-slate-300 line-clamp-4">
          {description}
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex justify-between space-x-4">
      {render && <DeleteHero id={id}/>}
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
        >
          Visit Project →
        </a>
        
      </CardFooter>
    </Card>
  );
};

export default HeroCard;
