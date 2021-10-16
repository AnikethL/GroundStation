import React, { useState, useEffect } from "react"
import { Box } from "components/UIElements"
import { Row, Column } from "components/Containers"

const Quick = () => {
	const [altitude, setAltitude] = useState(0)
	const [orientation, setOrientation] = useState({ "yaw": 0, "pitch": 0, "roll": 0 })
	const [groundSpeed, setGroundSpeed] = useState(0)
	const [airspeed, setAirspeed] = useState(0)
	const [distToWaypoint, setDistToWaypoint] = useState(0)
	const [battery, setBattery] = useState(0)
	const [throttle, setThrottle] = useState(0)
	const [latLong, setLatLong] = useState({ "lat": 0, "lon": 0 })

	const updateData = () => {
		fetch("http://localhost:5000/mav/quick")
			.then(response => response.json())
			.then(data => {
				setAltitude(data.altitude)
				setOrientation({"yaw": data.orientation.yaw, "roll": data.orientation.roll, "pitch": data.orientation.pitch })
				setGroundSpeed(data.ground_speed)
				setAirspeed(data.air_speed)
				setDistToWaypoint(data.dist_to_wp)
				setBattery(data.voltage)
				setThrottle(data.throttle)
				setLatLong({"lat": data.lat, "lon": data.lon})
			})
	}

	useEffect(() => {
		const tick = setInterval(() => {
			updateData()
		}, 250)
		return () => clearInterval(tick)
	})

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				height: "calc(100vh - 9.5rem)",
			}}
		>
			<Column style={{ marginBottom: "1rem" }}>
				<Row>
					<Box label="Altitude" content={altitude} />
					<Row>
						<Box label="Yaw" content={orientation.yaw} />
						<Box label="Roll" content={orientation.roll} />
						<Box label="Pitch" content={orientation.pitch} />
					</Row>
				</Row>
				<Row>
					<Box label="Ground Speed" content={groundSpeed} />
					<Box label="Airspeed" content={airspeed} />
				</Row>
				<Row>
					<Box label="Distance to Waypoint" content={distToWaypoint} />
					<Box label="Battery" content={battery} />
				</Row>
				<Row>
					<Box label="Throttle" content={throttle} />
					<Row>
						<Box label="Latitude" content={latLong.lat} />
						<Box label="Longitude" content={latLong.lon} />
					</Row>
				</Row>
			</Column>
			<Box label="Console + Error Messages" error />
		</div>
	)
}

export default Quick