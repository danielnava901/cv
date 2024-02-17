import React from 'react';

const Skill = ({skill}) => {
    return <div className="w-full h-full">
        <div className="flex flex-col">
            <div className="p-2">Lenguajes</div>
            <span className="px-8 py-2">PHP</span>
            <span className="px-8 py-2">Javascript</span>
            <span className="px-8 py-2">Python</span>
            <span className="px-8 py-2">HTML</span>
            <span className="px-8 py-2">CSS</span>
            <hr/>
            <div className="p-2">Frameworks</div>
            <span className="px-8 py-2">NextJS</span>
            <span className="px-8 py-2">ReactJs</span>
            <span className="px-8 py-2">Symfony</span>
        </div>
    </div>
};

export default Skill