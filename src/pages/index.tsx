import React, {useEffect, useState} from 'react';
import type { HeadFC, PageProps } from "gatsby"
import cvJson from '../data/cv.json';
import {JsonToRender} from "../components/JsonToRender";
import ViewerRight from "../components/ViewerRight";
import Profile from "../components/Profile";
import Skill from "../components/Skill";

const IndexPage : React.FC<PageProps> = () => {
    const [data] = useState(cvJson);
    const [showView, setShowView] = useState(false);
    const [currentClicable, setCurrentClicable] = useState('');

    useEffect(() => {
        const clickables = document.querySelectorAll(".clickable");
        clickables.forEach((clickable) => {
            clickable.addEventListener("click", () => {
               if(clickable.classList.contains("is-url")) {
                   setCurrentClicable("is-profile");
               }else if(clickable.classList.contains("is-skill")) {
                   setCurrentClicable("is-skill");
               }

                setShowView(true);
           });
        });

    }, []);

    return <main className="
        w-[100vw]
        h-[100vh]
        text-[0.9rem]
        lg:text-md relative
        fira-mono-medium
        ">
        <div className="w-full h-full p-3 flex flex-col">
            <div><span className="text-red-600 font-bold">&#123;</span></div>
            <div className="w-full ml-8">
                <JsonToRender
                    info={data}
                    length={Object.entries(data).length}
                    open={false}
                />
            </div>
            <div>
                <div><span className="text-red-600 font-bold">&#125;</span></div>
            </div>
        </div>
        {
            showView ? <ViewerRight onClickClose={() => {setShowView(false)}}>
                {currentClicable === 'is-profile' ? <Profile /> : null}
                {currentClicable === 'is-skill' ? <Skill skill="" /> : null}
            </ViewerRight> : null
        }
    </main>
}

export default IndexPage

export const Head: HeadFC = () => <title>Daniel Nava Viveros</title>
