import React from 'react'
import {cn, getTechLogos} from "@/lib/utils";
import Image from "next/image";

const DisplayTechIcons = async ({ techStack }: TechIconProps ) => {
    // FIX: Clean the techStack array before sending it to getTechLogos
    // 1. .trim() removes the space from " Power BI"
    // 2. .toLowerCase() turns "Python" into "python" to match your logo file
    const cleanedStack = techStack.map((tech) => tech.trim().toLowerCase());
    
    const techIcons = await getTechLogos(cleanedStack);

    return (
        <div className="flex flex-row">
            {techIcons.map(({ tech, url }, index) => (
                <div key={tech} className={cn("relative group bg-dark-300 rounded-full p-2 flex-center", index >= 1 && '-ml-3')}>
                    <span className="tech-tooltip capitalize">{tech}</span>
                    <Image src={url} alt={tech} width={100} height={100} className="size-5" />
                </div>
            ))}
        </div>
    )
}

export default DisplayTechIcons;