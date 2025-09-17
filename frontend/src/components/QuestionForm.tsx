const QuestionForm = () => {
  return (
    <div className="flex flex-col gap-3">
      <input
        type="input"
        placeholder="Name"
        className="border border-black rounded h-6 w-66 !p-2 font-brygada font-normal text-sm italic text-black"
      />
      <input
        type="input"
        placeholder="Email"
        className="border border-black rounded h-6 w-66 !p-2 font-brygada font-normal text-sm italic text-black"
      />
      <div className="flex gap-3">
        <textarea
          placeholder="Write your message here"
          className="border border-black rounded h-12 w-44 !p-2 font-brygada font-normal text-sm italic text-black"
        />
        <button
          className={
            "shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] bg-[linear-gradient(90deg,rgba(0,0,0,0.15)_0%,#000_39.9%)] text-white font-bold  text-xs w-[54px] !pt-2 !pb-2 !pr-10 !pl-10 rounded-lg flex text-center justify-center items-center"
          }
        >
          SEND
        </button>
      </div>
    </div>
  );
};

export default QuestionForm;
