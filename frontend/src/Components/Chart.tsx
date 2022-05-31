import { ComponentProps, useEffect, useState } from 'react';
import { PieChart } from 'react-minimal-pie-chart';

interface answerData {
    problem_id: string;
    my_answer: number;
    answer: number;
}

type Props = {
    data: ComponentProps<typeof PieChart>['data'];
  };

export default function Chart(props: Props) {
    const lineWidth = 60;

    const data = props.data.map((entry, i) => {
        return entry;
      });

    return (
        <PieChart
            data={data}
            style={{
                fontFamily:
                    '"Nunito Sans", -apple-system, Helvetica, Arial, sans-serif',
                fontSize: '8px',
                height: '450px',
            }}
            radius={PieChart.defaultProps.radius - 6}
            lineWidth={60}
            animate
            label={({ dataEntry }) => Math.round(dataEntry.percentage) + '%'}
            labelPosition={100 - lineWidth / 2}
            labelStyle={{
                fill: '#fff',
                opacity: 0.75,
                pointerEvents: 'none',
            }}
        />
    )
}

