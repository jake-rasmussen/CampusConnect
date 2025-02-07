import {
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import {
  ApplicationSubmissionEvaluation,
  ApplicationSubmissionEvaluationGrade,
  User,
} from "@prisma/client";
import Link from "next/link";
import { Check, ClockEdit, QuestionMark, X } from "tabler-icons-react";

type PropType = {
  projectId: string;
  applicationSubmissions: {
    id: string;
    user: User;
    applicationSubmissionEvaluation: ApplicationSubmissionEvaluation | null;
  }[];
};

const ApplicationSubmissionsTable = (props: PropType) => {
  const { projectId, applicationSubmissions } = props;

  const sortedApplicationSubmissions = applicationSubmissions.sort((a, b) => {
    return a.user.firstName.localeCompare(b.user.firstName);
  });

  return (
    <Card className="mx-4 max-h-[50vh] overflow-y-scroll">
      <Table className="rounded-2xl">
        <TableHeader>
          <TableColumn>Candidate Name</TableColumn>
          <TableColumn>Application ID</TableColumn>
          <TableColumn className="text-center">Status</TableColumn>
        </TableHeader>

        <TableBody emptyContent="There are no application submissions.">
          {sortedApplicationSubmissions.map((applicationSubmission, index) => {
            let evaluationIcon = <ClockEdit className="text-primary" />; // Default icon

            if (applicationSubmission.applicationSubmissionEvaluation) {
              const { evaluation } = applicationSubmission.applicationSubmissionEvaluation;
              if (evaluation === ApplicationSubmissionEvaluationGrade.YES) {
                evaluationIcon = <Check className="text-primary" />;
              } else if (evaluation === ApplicationSubmissionEvaluationGrade.MAYBE) {
                evaluationIcon = <QuestionMark className="text-primary" />;
              } else if (evaluation === ApplicationSubmissionEvaluationGrade.NO) {
                evaluationIcon = <X className="text-primary" />;
              }
            }

            return (
              <TableRow key={`submissionRow${index}`}>
                <TableCell className="font-medium text-primary underline">
                  <Link
                    href={`/evaluator/${projectId}/evaluate/${applicationSubmission.id}`}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {applicationSubmission.user.firstName} {applicationSubmission.user.lastName}
                  </Link>
                </TableCell>
                <TableCell className="font-medium">
                  {applicationSubmission.id}
                </TableCell>
                <TableCell className="flex items-center justify-center">
                  <span className="flex items-center justify-center h-6 w-6">
                    {evaluationIcon}
                  </span>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Card>
  );
};

export default ApplicationSubmissionsTable;
