import type React from "react";
import { generatePath, Link } from "react-router-dom";

export interface QuestList {
  text: string;
  quests: Quest[];
}

export interface Quest {
    id: string;
    displayName: string;
}

interface Props {
    items: QuestList[];
}

const QuestList: React.FC<Props> = ({items}) => {

    return <>
        {items.map(l=>
        <details name="quests" id="questlist">
            <summary>
                {l.text}
            </summary>
            <ul>
                {l.quests.map(q=>
                    <li>
                        <Link to={generatePath("/quest/:questId",{questId:q.id})}>{q.displayName}</Link>
                    </li>
                )}
            </ul>
             
        </details>)}
        <style>
            {`
            #questlist {
                border-bottom: 1px solid var(--kendo-color-subtle);
                box-shadow: 0px 1px white;
            }

            #questlist summary {
                padding: 1rem;
                }
            `}
        </style>
    </>
};

export default QuestList;