import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"
import cvJson from '../data/cv.json';
import {useEffect, useState} from "react";
import reactStringReplace from 'react-string-replace';
import {ViewOuter} from "../components/ViewOuter";

function urlify(text) {
    return reactStringReplace(text, /(https?:\/\/\S+)/g, (match, i) => (
        <a key={i} href={match}
           className="underline text-blue-200 is-url"
           target="_blank">{match}</a>
    ));
}

const renderValue = (keyVal, key, index) => {
    let renderElement = null;
    switch (typeof keyVal) {
        case "string":
            renderElement = <span key={`${key}-${index}`}
                              className="text-[#690] cursor-pointer lg:max-w-[490px]">
                "{urlify(keyVal)}",
            </span>
            break;
        case "number":
            renderElement = <span key={`${key}-${index}`}
                              className="code-number text-[#a83295] cursor-pointer">
                {keyVal},
            </span>
            break;
        case "boolean":
            renderElement = <span key={`${key}-${index}`}
                              className="code-number text-[#a83295] cursor-pointer">{
                keyVal ? "true" : "false"
            },</span>
            break;
        default:
            renderElement = <div
                key={`${key}-${index}`}
                className="code-line">
                {
                    Array.isArray(keyVal) ? <span className="flex flex-col">
                        <div className="code-line">
                            <pre className="start-bracket">&#91;</pre>
                        </div>
                        {
                            keyVal.map((subObj, i) => {
                                let subKeys = Object.keys(subObj);
                                return <div
                                    key={`${key}-${i}`}
                                    className="code-line pl-4 -left-8">
                                    <div className="code-line">
                                        <pre className="text-violet-500">&#123;</pre>
                                    </div>
                                    <div className="pl-4">
                                        {
                                            subKeys.map((sk, inx) => {
                                                return renderValue(subObj[sk], sk, "pepe");
                                            })
                                        }
                                    </div>
                                    <div className="code-line">
                                        <pre className="text-violet-500">&#125;,</pre>
                                    </div>
                                </div>
                            })
                        }
                        <div className="code-line">
                            <pre className="end-bracket">&#93;</pre>
                        </div>
                    </span> : (
                    typeof keyVal === "object" ? <span>
                            <div className="code-line">
                                <pre className="text-violet-500">&#123;</pre>
                            </div>
                            {
                                Object.keys(keyVal)
                                    .map((sk, inx) => {
                                    return renderValue(keyVal[sk], sk, inx);
                                })
                            }
                            <div className="code-line">
                                <pre className="text-violet-500">&#125;</pre>
                            </div>
                        </span> :
                        <span>
                            otro
                        </span>
                    )
                }
            </div>;
            break;
    }

    return <span className="mr-4 mb-2 flex">
        <div className="flex justify-center">
            <span className="cursor-pointer">"{key}"</span>
            <span className="mx-2">:</span>
        </div>
        {renderElement}
    </span>
}

const IndexPage: React.FC<PageProps> = () => {
    const [data, setData] = useState(cvJson);
    const [keys, setKeys] = useState(Object.keys(data));
    const [currentUrlViewer, setCurrentUrlViewer] = useState<string|null>(null);
    const [showViewer, setShowViewer] = useState(true);
    useEffect(()=> {
        let isUrlElements = document.querySelectorAll(".is-url");
        isUrlElements.forEach(element => {
           element.addEventListener("mouseenter", () => {
               let url = element.attributes.getNamedItem("href").value;
               console.log({url});
               setCurrentUrlViewer(url);
               setShowViewer(true);
           });


        });

        return () => {
            let isUrlElements = document.querySelectorAll(".is-url");
            isUrlElements.forEach(element => {
                element.removeEventListener("mouseenter", () => {
                    setCurrentUrlViewer(null);
                })
            });
        }
    }, []);
  return (
    <main className="
        w-[100vw]
        h-[100vh]
        text-[0.9rem]
        lg:text-md relative
        ">

      <div className="w-full h-full p-3 font-mono">
          <div className="code-line"><pre className="text-gray-200">&#123;</pre></div>
          {
              keys.map((key, index) => {
                  return <div
                      key={key}
                      className="code-line flex pl-4 hover:bg-[rgba(131,141,155,0.3)] transition duration-500">
                      { renderValue(data[key], key, index) }
                  </div>
              })
          }
          <div className="code-line"><pre className="text-gray-200">&#125;</pre></div>
      </div>

    </main>
  )
}

export default IndexPage

export const Head: HeadFC = () => <title>Daniel Nava Viveros</title>
