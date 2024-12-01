import React, { useState } from 'react';
import './Tabs.css'
export default function Tabs() {

  const tabs = [
    {
      name: 'HTML',
      content:
        'The HyperText Markup Language or HTML is the standard markup language for documents designed to be displayed in a web browser.',
    },
    {
      name: 'CSS',
      content:
        'Cascading Style Sheets is a style sheet language used for describing the presentation of a document written in a markup language such as HTML or XML.',
    },
    {
      name: 'JavaScript',
      content:
        'JavaScript, often abbreviated as JS, is a programming language that is one of the core technologies of the World Wide Web, alongside HTML and CSS.',
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  const handleKeyDown = (event) => {
    if (event.key === 'ArrowRight') {
      setActiveIndex((activeIndex + 1) % tabs.length);
    } else if (event.key === 'ArrowLeft') {
      setActiveIndex((activeIndex - 1 + tabs.length) % tabs.length);
    }
  };

  return (
    <div>
      <div role="tablist" aria-label="Programming Languages">
        {tabs.map((tab, index) => (
          <button
            key={tab.name}
            role="tab"
            aria-selected={activeIndex === index}
            aria-controls={`tabpanel-${index}`}
            id={`tab-${index}`}
            tabIndex={activeIndex === index ? 0 : -1}
            onClick={() => setActiveIndex(index)}
            onKeyDown={handleKeyDown}
            className={`tab ${activeIndex === index ? 'active' : ''}`}
          >
            {tab.name}
          </button>
        ))}
      </div>
      <div
        role="tabpanel"
        id={`tabpanel-${activeIndex}`}
        aria-labelledby={`tab-${activeIndex}`}
        tabIndex="0"
        className='tab-contents'
      >
        <p>{tabs[activeIndex].content}</p>
      </div>
    </div>
  );
}
