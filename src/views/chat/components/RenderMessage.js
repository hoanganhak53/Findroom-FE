import { Tooltip } from '@mui/material';
import React from 'react';
import { convertTimeMessage } from '../../../utilities/convert';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function linkify(text) {
    /* eslint-disable no-useless-escape */
    const urlRegex =
        /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi;
    return text.replace(urlRegex, function (url) {
        return '<a href="' + url + '" target="_blank">' + url + '</a>';
    });
}

export const RenderMessage = ({ message, currentUser }) => {
    const navigate = useNavigate();
    const { schedule } = message;

    if (schedule) {
        return (
            <Tooltip
                title={convertTimeMessage(message?.created_at?.seconds)}
                placement="left"
            >
                <Card
                    onClick={() => navigate(`/room/${schedule.room_id}`)}
                    className={`m-mess-img ${
                        message?.sender === currentUser.id ? 'owner' : ''
                    }`}
                >
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            height="200"
                            image={schedule.img}
                            alt="green iguana"
                        />
                        <CardContent>
                            <Typography
                                gutterBottom
                                variant="h5"
                                component="div"
                            >
                                Hẹn xem phòng
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Người dùng{' '}
                                <span className="text-primary font-weight-bold">
                                    {schedule.name}
                                </span>{' '}
                                muốn xem phòng của bạn!
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Hãy trả lời sớm nhất để tiện trao đổi nhé
                                &#128513;
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Địa điểm:{' '}
                                <span className="font-weight-bold">
                                    {schedule.location}
                                </span>
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Thời gian xem phòng:{' '}
                                <span className="font-weight-bold">
                                    {schedule.time}
                                </span>
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Số điện thoại:{' '}
                                <span className="font-weight-bold">
                                    {schedule.phone_number}
                                </span>
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Tooltip>
        );
    } else {
        return (
            <Tooltip
                title={convertTimeMessage(message?.created_at?.seconds)}
                placement="left"
            >
                {message?.img_url ? (
                    <img
                        src={message?.img_url}
                        alt="attach_img"
                        className={`m-mess-img ${
                            message?.sender === currentUser.id ? 'owner' : ''
                        }`}
                    />
                ) : (
                    <div
                        className={`m-mess ${
                            message?.sender === currentUser.id ? 'owner' : ''
                        }`}
                        dangerouslySetInnerHTML={{
                            __html: linkify(message?.content),
                        }}
                    />
                )}
            </Tooltip>
        );
    }
};
