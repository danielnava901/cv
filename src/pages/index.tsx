import React, {useEffect, useState} from 'react';
import type { HeadFC, PageProps } from "gatsby"
import {JsonToRender} from "../components/JsonToRender";
import ViewerRight from "../components/ViewerRight";
import Profile from "../components/Profile";
import Skill from "../components/Skill";
import cvJson from '../data/cv.json';
import particlesConf from "../data/particles.json";
import {ParticlesWrapper} from "../components/ParticlesWrapper";

function isHidden(el) {
    let style = window.getComputedStyle(el);
    return (style.display === 'none')
}

const IndexPage : React.FC<PageProps> = () => {
    const [data] = useState(cvJson);
    const [showView, setShowView] = useState(false);
    const [currentClicable, setCurrentClicable] = useState('');

    const colapsables = function(ev) {
        let item = this;
        let spanChild = item.querySelector("span")
        let parentElement = ev.target.parentElement;
        parentElement = parentElement.parentElement;
        parentElement = parentElement.parentElement;
        const collapsable = parentElement.querySelector(".collapsable");

        if(isHidden(collapsable)) {
            collapsable.style.display = "flex";
            spanChild.innerText = '-';
        }else {
            collapsable.style.display = "none";
            spanChild.innerText = '+';
        }
    }

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

        const collapsableButton = document.querySelectorAll(".collapsable-button");
        collapsableButton.forEach((item) => {
            item.addEventListener("click", colapsables);
        });

        return () => {
            collapsableButton.forEach((item) => {
                item.removeEventListener("click", colapsables);
            });
        }
    }, []);

    return <main className="
        w-[100vw]
        h-[100vh]
        text-[0.9rem]
        lg:text-md relative
        fira-mono-medium
        " style={{zIndex: 9}}>

        <div className="w-full h-full p-3 flex flex-col">
            <div><span className="text-red-600 font-bold">&#123;</span></div>
            <div className="w-full ml-8">
                <JsonToRender
                    info={data}
                    length={Object.entries(data).length}
                    open={true}
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
        <ParticlesWrapper
            id={"particlesView"}
            conf={
                {...particlesConf,
                    "particles": {...particlesConf.particles,
                        "color": {...particlesConf.particles.color, "value": "rgba(231,210,55,0.72)" }
                    }
                }} />
    </main>
}

export default IndexPage

export const Head: HeadFC = () => <title>Daniel Nava Viveros</title>
