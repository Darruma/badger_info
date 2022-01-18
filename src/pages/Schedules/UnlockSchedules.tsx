import { AutoColumn } from 'components/Column'
import styled from 'styled-components'
import React from 'react'
import { TYPE } from 'theme'
import { useSchedulesData } from 'state/boosts/hooks'
import { DarkGreyCard } from 'components/Card'
import { msToTime } from 'utils/time'
import tokens, { getTokenName } from 'constants/tokens'
import { useSettByAddress } from 'state/setts/hooks'
import { Schedule } from 'state/boosts/reducer'
import { Link } from 'react-router-dom'
import { unixToDateString, percentInRange } from 'utils/time'
import ProgressBar from '@ramonak/react-progress-bar'

const PageWrapper = styled.div`
  margin: 0 auto;
`
const LinkWrapper = styled(Link)`
  :hover {
    cursor: pointer;
    opacity: 0.7;
  }
  text-decoration-color: white;
  padding-left: 1rem;
  overflow-wrap: break-word;
  min-width: 180px;
`

const BarWrapper = styled.div`
  width: 75%;
  margin: 0 auto;
`
const UnlockSchedules = () => {
  const schedulesData = useSchedulesData()
  console.log(schedulesData)
  return (
    <PageWrapper>
      <AutoColumn gap="20px">
        <AutoColumn gap="20px">
          {Object.entries(schedulesData).map(([settAddr, data]) => {
            if (data.length > 0) {
              return data.map((schedule: any, index: number) => {
                return <ScheduleInfo key={index} settAddr={settAddr} data={schedule}></ScheduleInfo>
              })
            } else {
              return <></>
            }
          })}
        </AutoColumn>
      </AutoColumn>
    </PageWrapper>
  )
}

interface ScheduleProps {
  settAddr: string
  data: Schedule
}
const ScheduleInfo = (props: ScheduleProps) => {
  const { settAddr, data } = props
  const sett = useSettByAddress(settAddr)
  const percent = (percentInRange(data.startTime, data.endTime) * 100).toFixed(1)
  const inRange = true
  return (
    <>
      {inRange && (
        <>
          <LinkWrapper to={`/vaults/${settAddr}`}>
            <TYPE.largeHeader style={{ textAlign: 'center' }}>{sett?.name}</TYPE.largeHeader>
          </LinkWrapper>
          <DarkGreyCard key={settAddr} style={{ width: '90%', margin: '0 auto' }}>
            <AutoColumn gap="20px">
              <AutoColumn gap="lg">
                <AutoColumn gap="4px">
                  <TYPE.main fontWeight={400}>Token</TYPE.main>
                  <TYPE.label fontSize="20px">{getTokenName(data.token)}</TYPE.label>
                </AutoColumn>
                <AutoColumn gap="4px">
                  <TYPE.main fontWeight={400}>Inital Tokens Locked</TYPE.main>
                  <TYPE.label fontSize="20px">{data.initialTokensLocked}</TYPE.label>
                </AutoColumn>
                <AutoColumn gap="4px">
                  <TYPE.main fontWeight={400}>Start Time</TYPE.main>
                  <TYPE.label fontSize="20px">{unixToDateString(data.startTime)}</TYPE.label>
                </AutoColumn>
                <AutoColumn gap="4px">
                  <TYPE.main fontWeight={400}>End Time</TYPE.main>
                  <TYPE.label fontSize="20px">{unixToDateString(data.endTime)}</TYPE.label>
                </AutoColumn>
                <AutoColumn gap="4px">
                  <TYPE.main fontWeight={400}>Duration </TYPE.main>
                  <TYPE.label fontSize="20px">{msToTime(data.duration * 1000)}</TYPE.label>
                </AutoColumn>
                <AutoColumn gap="4px">
                  <TYPE.main fontWeight={400}>Schedule Progress</TYPE.main>
                  <BarWrapper>
                    <ProgressBar completed={Number(percent)} bgColor={'green'} />
                  </BarWrapper>
                </AutoColumn>
              </AutoColumn>
            </AutoColumn>
          </DarkGreyCard>
        </>
      )}
    </>
  )
}
export default UnlockSchedules
