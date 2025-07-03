import type { NotificationType } from "../../types/global";
import { NotificationStatusEnum } from "../../types/enum";

const Notification = ({status, title, message}: NotificationType) => {
    let specialClasses = 'text-white';
    
    // console.log(status);
    // console.log(title);
    // console.log(message);

    if (status === NotificationStatusEnum.Error) {
        specialClasses = "text-red-400";
    }

    if (status === NotificationStatusEnum.Success) {
        specialClasses = 'text-green-400'
    }

    const css = `flex w-full gap-1 justify-content align-items h-12 bg-[#1a8ed1] py-2 px-[10%] ${specialClasses}`

    return (
        <section className={css}>
            <h2 className='text-base m-0'>{title}</h2>
            <p className='text-base m-0'>{message}</p>
        </section>
    );
};

export default Notification;