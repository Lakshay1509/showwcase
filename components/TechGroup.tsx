import { Separator } from "./ui/separator";
import { Badge } from "./ui/badge";
import Image from "next/image";
import EditTechSheet from "./EditTechSheet";
import EditGroup from "./EditNameGroup";
import DeleteGroup from "./DeleteGroup";



interface TechGroup {
  id: string,
  name: string,
  position: number,
  renderEdit : boolean,
  techs: {
    id: number,
    name: string,
    img_url?: string | null
  }[]
}

const TechGroup = ({name, techs ,id,renderEdit,position}: TechGroup) => {
  return (
    <main className=" py-2 flex flex-col space-y-2 lg:px-6 ">
      <div>
        <div className="flex flex-row w-full items-center justify-between">
          <div className="flex flex-row items-center justify-center space-x-1">
        <h1 className="lg:text-xl px-2 text-gray-500">{name}</h1>
        {renderEdit && <EditGroup name={name} position={position} id={id} maxPosition={techs.length} />}
        
        </div>
        <div className="flex flex-row justify-center items-center spaxe-x-2">
        {renderEdit && <EditTechSheet name={name} techs={techs} id={id} />}
        {renderEdit && <DeleteGroup id={id} />}
        
        </div>
        </div>
        
        <Separator />


        <div className="p-2 flex flex-row flex-wrap justify-start items-center space-x-3  ">
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