import React, {useEffect} from 'react';
import reactStringReplace from "react-string-replace";

function urlify(text) {
    return reactStringReplace(text, /(https?:\/\/\S+)/g, (match, i) => (
        <a key={i} href={match}
           className="underline text-blue-200 is-url"
           target="_blank">{match}</a>
    ));
}

function searchWords(text) {
    return reactStringReplace(text,
        /\b(Symfony|ReactJS|NextJS|Node|HTML|Python|Javascript|CSS|PHP|REST|SOAP|GPS|interfaces intuitivas|integración de sistemas|visualizar|cámaras|equipo de desarrollo)\b/,
        (match, i) => (
        <span className="text-blue-200">{match}</span>
    ));
}

function isHidden(el) {
    let style = window.getComputedStyle(el);
    return (style.display === 'none')
}

const SpanWrap = ({k, children, index}) => (
    <div className="w-full flex hover:font-bold">
        <div className="flex">
            <span className="mr-2 text-yellow-400 cursor-pointer">{k}</span>
            <span className="mr-4">:</span>
        </div>
        {children}
    </div>
)

const renderFinalContent = (key, val, index) => {
    let renderElement;
    switch (typeof val) {
        case "string":

            renderElement = <SpanWrap k={key} key={`${key}-${index}`}>
                <span className="text-[#690] cursor-pointer lg:max-w-[490px]">
                    "{searchWords(urlify(val))}"<span className="text-violet-400">,</span>
                </span>
            </SpanWrap>
            break;
        case "number":
            renderElement = <SpanWrap k={key} key={`${key}-${index}`}>
                <span className="code-number text-[#a83295] cursor-pointer">
                {val}<span className="text-violet-400"></span>
                </span>
            </SpanWrap>
            break;
        case "boolean":
            renderElement = <SpanWrap k={key} key={`${key}-${index}`}>
                {val ? "true" : "false"}<span className="text-violet-400">,</span>
            </SpanWrap>
            break;
        default:
            renderElement = <div key={`${key}-${index}`}>Otro</div>;
            break;
    }
    return renderElement
}

export const JsonToRender = ({info, open, length = 0}) => {
    const entries = Object.entries(info);

    useEffect(() => {
        const collapsableButton = document.querySelectorAll(".collapsable-button");
        collapsableButton.forEach((item) => {
           item.addEventListener("click", function(ev) {
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

           })
        });

    }, []);

    return <div className="w-full">
        {
            entries.map(([key, val] : [any, any], index) => {

                if(typeof(val) === 'object' && Object.entries(val).length > 0) {
                    const isArray = Array.isArray(val);
                    const bracketOpen = isArray ? '[' : '{';
                    const bracketClose = isArray ? ']' : '}';

                    return <div className="w-full collapsable-father">
                        <div className="flex items-center">
                            <div className="collapsable-button">
                                <span className="text-sm text-blue-500 mr-1
                                h-4 w-4 rounded-full flex items-center justify-center
                                hover:opacity-50
                                hover:bg-blue-200
                                cursor-pointer">
                                    {open ? '-' : '+'}
                                </span>
                            </div>

                            <span className="text-yellow-400 cursor-pointer">{!isNaN(+key) ? '' : <span>{key}:</span>}</span>
                            <span className="text-red-600 font-bold"> {bracketOpen}</span>
                        </div>
                        <div className="ml-8 collapsable"
                             style={{display: open ? 'flex': 'none'}}
                        >
                            {JsonToRender({info: val, length: val.length, open: true})}
                        </div>
                        <div>
                            <span className="text-red-600 font-bold">{bracketClose}</span>
                            {(length - 1) != index ? <span className="text-violet-400">,</span> : null}
                        </div>
                    </div>
                }else {
                    if (Array.isArray(val)) {
                        return <div className="text-red-600 font-bold">[]</div>
                    }else if(typeof val === "object"){
                        return <div className="text-red-600 font-bold">{}</div>
                    }else {
                        return renderFinalContent(key, val, index);
                    }
                }
            })
        }
    </div>
}