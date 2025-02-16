import { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar, ResponsiveContainer } from "recharts";
import LoadingSection from "~/components/loadingSection";
import PageWrapper from "~/components/pageWrapper";
import UserLayout from "~/layouts/userLayout";
import { api } from "~/utils/api";
import Error from "next/error";
import { NextPageWithLayout } from "../_app";
import { dateToStringFormattedWithYear } from "~/utils/helpers";
import LoadingPage from "~/components/loadingPage";
import lodash from "lodash";

const primaryColor = "#1746A2";

const aggregateDataByDate = (data: { date: string | undefined; count: number; }[]) => {
  return lodash.chain(data)
    .groupBy(d => dateToStringFormattedWithYear(new Date(d.date!)))
    .map((value, key) => ({ date: key, count: lodash.sumBy(value, 'count') }))
    .value();
};

const Data: NextPageWithLayout = () => {
  const { data, isLoading, error } = api.schoolAdminRouter.getDashboardData.useQuery();

  if (isLoading) {
    return <LoadingPage />
  } else if (error) {
    return <Error statusCode={error?.data?.httpStatus || 500} />;
  } else {
    return (
      <PageWrapper title="School Admin Dashboard">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
          {/* Projects Created Over Time */}
          <div className="bg-white shadow-lg rounded-xl p-6 border-l-4 border-primary" style={{ borderColor: primaryColor }}>
            <h2 className="text-xl font-semibold mb-4 text-primary">Projects Created Over Time</h2>
            <ResponsiveContainer width="100%" height={300} minWidth={600}>
              <LineChart data={aggregateDataByDate(data.projectsOverTime)}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="count" stroke={primaryColor} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white shadow-lg rounded-xl p-6 h-[400px] border-l-4 border-primary" style={{ borderColor: primaryColor }}>
            <h2 className="text-xl font-semibold mb-4 text-primary">Applications Created Over Time</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={aggregateDataByDate(data.applicationsOverTime)}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="count" stroke={primaryColor} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white shadow-lg rounded-xl p-6 h-[400px] border-l-4 border-primary" style={{ borderColor: primaryColor }}>
            <h2 className="text-xl font-semibold mb-4 text-primary">Application Submission Status</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data.applicationSubmissionStatus}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="status" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill={primaryColor} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white shadow-lg rounded-xl p-6 h-[400px] border-l-4 border-primary" style={{ borderColor: primaryColor }}>
            <h2 className="text-xl font-semibold mb-4 text-primary">Total Applications Submitted</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={aggregateDataByDate(data.totalSubmissions)}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill={primaryColor} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </PageWrapper>
    );
  };
};

Data.getLayout = (page) => {
  return <UserLayout>{page}</UserLayout>;
};

export default Data;
