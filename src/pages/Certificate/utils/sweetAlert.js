import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent( Swal );

const sweetAlert = ( { title, text, icon, ...props } ) => {
  const color = icon === 'error' ? 'bg-red-500' : icon === 'success' ? 'bg-caribbeangreen-500' : icon === 'info' ? 'bg-custom-blue' : 'bg-caribbeangreen-500';
  MySwal.fire( {
    text,
    title: title ?? 'Success!',
    icon: icon ?? 'success',
    toast: true,
    timer: props?.timer ?? 5000,
    timerProgressBar: true,
    customClass: {
      popup: 'bg-custom-blue rounded-xl pb-10',
      timerProgressBar: `${ props?.timerColor ?? color } h-[7px]`
    },
    ...props
  } );
};

export default sweetAlert;