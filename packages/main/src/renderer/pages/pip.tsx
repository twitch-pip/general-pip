import close from '@images/close.svg';

const Pip = () => {
  return (
    <>
      <div className="panel">
        <img onClick={() => console.log('hello')} src={close} alt="close" />
      </div>
    </>
  );
};

export default Pip;
