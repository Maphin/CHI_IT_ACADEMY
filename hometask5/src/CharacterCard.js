import React from "react";

const CharacterCard = ({ character }) => {
    return (
        <div className="character">
            <img src={character.image} alt={character.name}/>
            <div className="character-name">{character.name}</div>
            <div className="character-status">{character.status}</div>
        </div>
    )
}

export default CharacterCard;