import React, {useState} from 'react';
import type { HeadFC, PageProps } from "gatsby"
import cvJson from '../data/cv.json';
import {JsonToRender} from "../components/JsonToRender";

const IndexPage : React.FC<PageProps> = () => {
    const [data, setData] = useState(cvJson);

    return <main className="
        w-[100vw]
        h-[100vh]
        text-[0.9rem]
        lg:text-md relative
        ">
        <div className="w-full h-full p-3 font-mono flex flex-col">
            <div><span className="text-red-600 font-bold">&#123;</span></div>
            <div className="w-full ml-8">
                <JsonToRender info={data} length={Object.entries(data).length} />
            </div>
            <div>
                <div><span className="text-red-600 font-bold">&#125;</span></div>
            </div>
        </div>
    </main>
}

export default IndexPage

export const Head: HeadFC = () => <title>Daniel Nava Viveros</title>
