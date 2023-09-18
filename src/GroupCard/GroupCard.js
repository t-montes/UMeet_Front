import React from 'react';

const GroupCard = ({ colorFondo, textoCentral, imagenesPerfil }) => {
    return (
        <div style={{
            backgroundColor: colorFondo,
            borderRadius: '15px',
            width: '375px',
            height: '375px',
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: '30px',
            textAlign: 'center',
            color: 'white'
        }}>
            {/* Display user profile images */}
            <div style={{
                position: 'absolute',
                top: '10px',
                left: '10px',
                display: 'flex',
            }}>
                {imagenesPerfil.slice(0, 3).map((img, index) => (
                    <img 
                        key={index}
                        src={img} 
                        alt={"User " + (index + 1)} 
                        style={{
                            width: '83px',
                            height: '83px',
                            borderRadius: '50%',
                            border: '2px solid white',
                            zIndex: 3 - index,
                            marginLeft: index === 0 ? '0' : '-41.5px'  // Overlap half of the circle
                        }} 
                    />
                ))}
            </div>
            {/* Display central text */}
            <span>{textoCentral}</span>
        </div>
    );
};

export default GroupCard;
