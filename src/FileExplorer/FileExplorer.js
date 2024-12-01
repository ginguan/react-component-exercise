import React, { useState } from "react";

export default function FileExplorer() {
    const data = [
        {
          id: 1,
          name: 'README.md',
        },
        {
          id: 2,
          name: 'Documents',
          children: [
            {
              id: 3,
              name: 'Word.doc',
            },
            {
              id: 4,
              name: 'Powerpoint.ppt',
            },
          ],
        },
        {
          id: 5,
          name: 'Downloads',
          children: [
            {
              id: 6,
              name: 'unnamed.txt',
            },
            {
              id: 7,
              name: 'Misc',
              children: [
                {
                  id: 8,
                  name: 'foo.txt',
                },
                {
                  id: 9,
                  name: 'bar.txt',
                },
              ],
            },
          ],
        },
      ]
      const [expandedNodes, setExpandedNodes] = useState({});

      const toggleNode = (id) => {
        setExpandedNodes((prevState) => ({
          ...prevState,
          [id]: !prevState[id],
        }));
      };
    
      const showDisplayData = (direct) => {
        const hasChildren = direct.children && direct.children.length > 0;
        const isExpand = expandedNodes[direct.id];
    
        return (
          <div style={{ margin: "20px" }}>
            <span>{direct.name} </span>
            <span
              onClick={() => {
                toggleNode(direct.id);
              }}
              style={{ cursor: "pointer", color: "blue" }}
            >
              {" "}
              {hasChildren ? (isExpand ? "[-]" : "[+]") : null}
            </span>
            {direct?.children?.map((child) => {
              if (isExpand) {
                console.log(child);
                return showDisplayData(child);
              }
            })}
          </div>
        );
      };
    
      return <div>{data?.map((item) => showDisplayData(item))}</div>;
}
