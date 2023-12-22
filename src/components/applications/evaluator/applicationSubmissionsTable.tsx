import { User } from "@prisma/client";
import Link from "next/link";

import { Card } from "~/components/shadcn_ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/shadcn_ui/table";

type PropType = {
  projectId: string;
  applicationSubmissions: {
    id: string;
    user: User;
  }[];
};

const ApplicationSubmissionsTable = (props: PropType) => {
  const { projectId, applicationSubmissions } = props;

  return (
    <Card className="mx-4 border border-black bg-white">
      <Table className="rounded-2xl border-none">
        <TableHeader>
          <TableRow>
            <TableHead>Candidate Name</TableHead>
            <TableHead>Application ID</TableHead>
            <TableHead>Evaluated?</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {applicationSubmissions.map(
            (applicationSubmission, index: number) => (
              <TableRow className="border-none" key={`submissionRow${index}`}>
                <TableCell className="font-medium text-primary underline">
                  <Link
                    href={`/evaluator/${projectId}/evaluate/${applicationSubmission.id}`}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {applicationSubmission.user.firstName}{" "}
                    {applicationSubmission.user.lastName}
                  </Link>
                </TableCell>
                <TableCell className="font-medium">
                  {applicationSubmission.id}
                </TableCell>
                <TableCell></TableCell>
              </TableRow>
            ),
          )}
        </TableBody>
      </Table>
    </Card>
  );
};

export default ApplicationSubmissionsTable;
