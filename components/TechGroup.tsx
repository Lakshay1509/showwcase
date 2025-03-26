import { Separator } from "./ui/separator";
import { Badge } from "./ui/badge";
import Image from "next/image";
import EditTechSheet from "./EditTechSheet";


interface TechGroup {
  id: string,
  name: string,
  techs: {
    id: number,
    name: string,
    img_url?: string | null
  }[]
}

const TechGroup = ({name, techs ,id}: TechGroup) => {
  return (
    <main className="px-6 py-3 flex flex-col space-y-2  ">
      <div>
        <div className="flex flex-row w-full items-center justify-between">
        <h1 className="lg:text-2xl px-2 text-gray-500">{name}</h1>
        <EditTechSheet name={name} techs={techs} id={id} />
        </div>
        <Separator />


        <div className="p-2 flex flex-row flex-wrap justify-start items-center space-x-3">
          {techs && techs.map((tech) => (
            <Badge
              key={tech.id}
              variant="outline"
              className="p-2 text-[14px] flex justify-center items-center"
            >
              {tech.img_url && <Image
                src={tech.img_url}
                alt={tech.name}
                height={18}
                width={18}
              />}
              {tech.name}
            </Badge>
          ))}
        </div>
      </div>
    </main>
  );
};

export default TechGroup;