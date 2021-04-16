import {IMinecraftCoordinate} from "../../../api/CoordinatesTypes";
import {DeleteOutlined} from '@ant-design/icons';
import React from 'react';
import {StringUtils} from "../../../global/utils/string";
import {Popover, Tooltip, Typography} from "antd";
import WorldIcon from "../WorldIcon/WorldIcon";
import XYZList from "../XYZList/XYZList";
import CoordinatesAPI from "../../../api/CoordinatesAPI";

const CoordinatesTableConfig = (onDelete:(id)=>void) => [
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

                    <WorldIcon world={world} style={{width: 20, marginRight: 9}}/>
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
                <Popover content={description} overlayStyle={{maxWidth: 300}}>
                    <Typography.Paragraph ellipsis={{rows: 1}} style={{maxWidth: 200, marginBottom: 0}}>
                        {description}
                    </Typography.Paragraph>
                </Popover>
            )
        }
    },
    {
        id: 'actions',
        title: '',
        render: (record) => {
            return (
                <Tooltip title='Delete Location'>
                    <DeleteOutlined onClick={()=>onDelete(record.id)} style={{fontSize:18, color: '#e86161'}}/>
                </Tooltip>
            )
        }
    }
]

export default CoordinatesTableConfig;