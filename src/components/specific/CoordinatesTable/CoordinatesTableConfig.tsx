import {IMinecraftCoordinate} from "../../../api/CoordinatesTypes";
import React from 'react';
import {StringUtils} from "../../../global/utils/string";
import {Popover, Typography} from "antd";
import WorldIcon from "../WorldIcon/WorldIcon";
import XYZList from "../XYZList/XYZList";

const CoordinatesTableConfig = [
    {
        id: 'name',
        title: 'Name',
        dataIndex: 'name',
        render: (name: string, record: IMinecraftCoordinate) => {
            return (
                <div className='name-column'>
                    <div className='name'>
                        {name}
                    </div>
                    <XYZList coordinate={record}/>
                </div>
            )
        }
    },
    {
        id: 'category',
        title: 'Category',
        dataIndex: 'category',
        render: (category: string) => {
            if (category) return StringUtils.camelCaseToRegular(category, true);
            else return null;
        }
    },
    {
        id: 'world',
        title: 'World',
        dataIndex: 'world',
        render: (world: string) => {
            return (
                <div>

                    <WorldIcon world={world} style={{width:20, marginRight:9}}/>
                    {StringUtils.camelCaseToRegular(world, true)}
                </div>
            )
        }
    },
    {
        id: 'owner',
        title: 'Owner',
        dataIndex: 'owner',
    },
    {
        id: 'description',
        title: 'Description',
        dataIndex: 'description',
        render: (description: string) => {
            return (
                <Popover content={description} overlayStyle={{maxWidth:300}}>
                    <Typography.Paragraph ellipsis={{rows: 1}} style={{maxWidth: 200, marginBottom: 0}}>
                        {description}
                    </Typography.Paragraph>
                </Popover>
            )
        }
    },
]

export default CoordinatesTableConfig;