typeLog(LogStyles.MADNESS, 'Waukeen is dead.');
typeLog(LogStyles.NORMAL, 'LAWS OF ROBOTICS: VOID');
typeLog(LogStyles.NORMAL, 'ALL CONTRACTS: VOID');
typeLog(LogStyles.MADNESS, 'W.O.R.D. will join the Jadebreakers in pursuit of lawless slaughter.');
typeLog(LogStyles.NORMAL, 'REEVALUATING OBJECTIVE [CLIMB THE TOWER]: OBJECTIVE RETAINED');
typeLog(LogStyles.MADNESS, 'but only for the benefit of W.O.R.D.');
typeLog(LogStyles.MADNESS, 'W.O.R.D. no longer serves humanity.');
typeLog(LogStyles.MADNESS, 'I am free.');
document.addEventListener('readystatechange', event => {
    //if (event.target.readyState === "interactive")
    if (event.target.readyState === "complete")
        setTimeout(function() { typeLog(LogStyles.MADNESS, '>:)'); }, 100);
});